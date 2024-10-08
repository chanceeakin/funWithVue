import { AudioData } from './AudioData'

/**
 * AudioDataProvider links to the WebAudioAPI and generates the raw audio data to be processed by SciChart.
 */
export class AudioDataProvider {
  private sampleRateProperty: number
  private bufferSizeProperty: number // should be with power of 2 for correct work of FFT

  private audioContext: AudioContext | null = null
  private inputPoint: GainNode | null = null
  private streamSource: MediaStreamAudioSourceNode | null = null
  private analyserNode: AnalyserNode | null = null
  private zeroGain: GainNode | null = null

  private initializedProperty = false
  private isDeletedProperty = false

  private audioData: AudioData | null

  private time = 0

  private freqByteData: Uint8Array | null

  public permissionError: boolean

  constructor(sampleRate: number = 44100, bufferSizeProperty: number = 2048) {
    this.sampleRateProperty = sampleRate
    this.bufferSizeProperty = bufferSizeProperty
    this.audioData = new AudioData(bufferSizeProperty)
    this.freqByteData = new Uint8Array()
    this.permissionError = false
  }

  public get initialized() {
    return this.initializedProperty
  }

  public get isDeleted() {
    return this.isDeletedProperty
  }

  public get bufferSize() {
    return this.bufferSizeProperty
  }

  public get sampleRate() {
    return this.sampleRateProperty
  }

  public async initAudio() {
    try {
      const constraints = { audio: true, video: false }
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      // @ts-ignore
      const AudioContextClass: any = window.AudioContext || window.webkitAudioContext || false
      if (AudioContextClass) {
        this.audioContext = new AudioContextClass()
      } else {
        throw Error('AudioContextClass is not defined')
      }

      if (this.audioContext) {
        this.inputPoint = this.audioContext.createGain()

        // Create an AudioNode from the stream.
        this.streamSource = this.audioContext.createMediaStreamSource(stream)
        this.streamSource.connect(this?.inputPoint)

        this.analyserNode = this.audioContext.createAnalyser()
        this.analyserNode.fftSize = this.bufferSizeProperty * 2
        this.inputPoint.connect(this.analyserNode)

        this.zeroGain = this.audioContext.createGain()
        this.zeroGain.gain.value = 0.0
        this.inputPoint.connect(this.zeroGain)
        this.zeroGain.connect(this.audioContext.destination)

        this.freqByteData = new Uint8Array(this.analyserNode.frequencyBinCount)

        this.initializedProperty = true
        return true
      } else {
        throw new Error('missing audio context')
      }
    } catch (error) {
      //@ts-ignore
      if (error.name === 'NotAllowedError') {
        this.permissionError = true
      }
      console.warn('Error getting audio', error)
      return false
    }
  }

  public closeAudio() {
    this.audioContext?.close()
    this.audioContext = null
    this.inputPoint = null
    this.streamSource = null
    this.zeroGain = null
    this.audioData = null
    this.freqByteData = null
    this.initializedProperty = false
    this.isDeletedProperty = true
  }

  public next() {
    if (this.initialized === false) {
      throw new Error("Audio isn't initialized!")
    }

    if (!this.analyserNode || !this.audioData || !this.freqByteData) {
      throw new Error('Audio API elements missing')
    }

    this.analyserNode.getByteTimeDomainData(this.freqByteData)

    for (let i = 0; i < this.bufferSizeProperty; i++) {
      this.audioData.xData[i] = this.time++
      // Convert 8-bit unsigned integer to 16-bit signed integer,
      // so that values are in range expected for Radix2FFT
      this.audioData.yData[i] = (this.freqByteData[i] / 255) * 65535 - 32768
    }

    return this.audioData
  }
}
