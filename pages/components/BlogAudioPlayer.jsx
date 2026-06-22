import { useEffect, useMemo, useRef, useState } from 'react'

const speedOptions = [0.75, 1, 1.25, 1.5]

const chunkText = (text) => {
  const sentences = text
    .replace(/\s+/g, ' ')
    .trim()
    .match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []

  const chunks = []

  sentences.forEach((sentence) => {
    const next = sentence.trim()
    const current = chunks[chunks.length - 1] || ''

    if (!current || `${current} ${next}`.length > 1600) {
      chunks.push(next)
      return
    }

    chunks[chunks.length - 1] = `${current} ${next}`
  })

  return chunks
}

export default function BlogAudioPlayer({ title, text }) {
  const chunks = useMemo(() => chunkText(text || ''), [text])
  const [isSupported, setIsSupported] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [chunkIndex, setChunkIndex] = useState(0)
  const [charOffset, setCharOffset] = useState(0)
  const chunkIndexRef = useRef(0)
  const charOffsetRef = useRef(0)
  const playbackSessionRef = useRef(0)
  const playbackStatusRef = useRef('idle')
  const speedRef = useRef(speed)

  const totalChars = useMemo(
    () => chunks.reduce((total, chunk) => total + chunk.length, 0),
    [chunks]
  )

  const playedChars = useMemo(
    () =>
      chunks.slice(0, chunkIndex).reduce((total, chunk) => total + chunk.length, 0) +
      charOffset,
    [chunks, chunkIndex, charOffset]
  )

  const progress = totalChars ? Math.min((playedChars / totalChars) * 100, 100) : 0

  const syncProgress = (nextChunkIndex, nextCharOffset = 0) => {
    chunkIndexRef.current = nextChunkIndex
    charOffsetRef.current = nextCharOffset
    setChunkIndex(nextChunkIndex)
    setCharOffset(nextCharOffset)
  }

  const finishPlayback = () => {
    playbackStatusRef.current = 'idle'
    syncProgress(0, 0)
    setIsPlaying(false)
    setIsPaused(false)
  }

  const speakFrom = (startChunkIndex, startCharOffset = 0, sessionId = playbackSessionRef.current) => {
    if (!chunks.length || !isSupported) return
    if (sessionId !== playbackSessionRef.current || playbackStatusRef.current !== 'playing') return
    if (startChunkIndex >= chunks.length) {
      finishPlayback()
      return
    }

    const safeChunkIndex = startChunkIndex
    const sourceText = chunks[safeChunkIndex].slice(startCharOffset).trim()

    if (!sourceText) {
      speakFrom(safeChunkIndex + 1, 0, sessionId)
      return
    }

    const utterance = new SpeechSynthesisUtterance(sourceText)
    utterance.rate = speedRef.current
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onboundary = (event) => {
      if (sessionId !== playbackSessionRef.current || playbackStatusRef.current !== 'playing') return

      if (typeof event.charIndex === 'number') {
        syncProgress(safeChunkIndex, startCharOffset + event.charIndex)
      }
    }

    utterance.onend = () => {
      if (sessionId !== playbackSessionRef.current || playbackStatusRef.current !== 'playing') return

      const nextChunk = safeChunkIndex + 1

      if (nextChunk < chunks.length) {
        syncProgress(nextChunk, 0)
        speakFrom(nextChunk, 0, sessionId)
        return
      }

      finishPlayback()
    }

    utterance.onerror = () => {
      if (sessionId !== playbackSessionRef.current) return
      playbackStatusRef.current = 'idle'
      setIsPlaying(false)
      setIsPaused(false)
    }

    window.speechSynthesis.speak(utterance)
  }

  const startPlayback = (startChunkIndex = chunkIndexRef.current, startCharOffset = charOffsetRef.current) => {
    if (!chunks.length || !isSupported) return

    playbackSessionRef.current += 1
    const sessionId = playbackSessionRef.current
    playbackStatusRef.current = 'playing'
    window.speechSynthesis.cancel()
    setIsPlaying(true)
    setIsPaused(false)
    syncProgress(startChunkIndex, startCharOffset)

    window.setTimeout(() => {
      speakFrom(startChunkIndex, startCharOffset, sessionId)
    }, 0)
  }

  useEffect(() => {
    setIsSupported(typeof window !== 'undefined' && 'speechSynthesis' in window)

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        playbackSessionRef.current += 1
        playbackStatusRef.current = 'idle'
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      playbackSessionRef.current += 1
      playbackStatusRef.current = 'idle'
      window.speechSynthesis.cancel()
    }

    syncProgress(0, 0)
    setIsPlaying(false)
    setIsPaused(false)
  }, [text])

  useEffect(() => {
    speedRef.current = speed

    if (isPlaying && !isPaused && typeof window !== 'undefined') {
      startPlayback(chunkIndexRef.current, charOffsetRef.current)
    }
  }, [speed])

  const handlePlayPause = () => {
    if (!chunks.length || !isSupported) return

    if (isPlaying && !isPaused) {
      playbackSessionRef.current += 1
      playbackStatusRef.current = 'paused'
      window.speechSynthesis.cancel()
      setIsPlaying(false)
      setIsPaused(true)
      return
    }

    if (isPaused) {
      startPlayback(chunkIndexRef.current, charOffsetRef.current)
      return
    }

    startPlayback(chunkIndexRef.current, charOffsetRef.current)
  }

  const handleSeek = (event) => {
    const nextProgress = Number(event.target.value)
    const targetChar = Math.floor((nextProgress / 100) * totalChars)
    let remaining = targetChar
    let nextChunk = 0

    while (nextChunk < chunks.length && remaining > chunks[nextChunk].length) {
      remaining -= chunks[nextChunk].length
      nextChunk += 1
    }

    const safeChunk = Math.min(nextChunk, chunks.length - 1)
    const safeOffset = Math.max(remaining, 0)
    syncProgress(safeChunk, safeOffset)

    if (isPlaying && !isPaused) {
      startPlayback(safeChunk, safeOffset)
    }
  }

  const handleStop = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      playbackSessionRef.current += 1
      playbackStatusRef.current = 'idle'
      window.speechSynthesis.cancel()
    }

    syncProgress(0, 0)
    setIsPlaying(false)
    setIsPaused(false)
  }

  if (!text) return null

  return (
    <div className='blog-audio-player' aria-label={`Listen to ${title || 'this blog'}`}>
      <button
        type='button'
        className='blog-audio-player__play'
        onClick={handlePlayPause}
        aria-label={isPlaying && !isPaused ? 'Pause blog audio' : 'Play blog audio'}
      >
        <span
          className={
            isPlaying && !isPaused
              ? 'blog-audio-player__pause-icon'
              : 'blog-audio-player__play-icon'
          }
          aria-hidden='true'
        />
      </button>
      <input
        className='blog-audio-player__progress'
        type='range'
        min='0'
        max='100'
        value={progress}
        onChange={handleSeek}
        aria-label='Audio progress'
      />
      <select
        className='blog-audio-player__speed'
        value={speed}
        onChange={(event) => setSpeed(Number(event.target.value))}
        aria-label='Playback speed'
      >
        {speedOptions.map((option) => (
          <option key={option} value={option}>
            {option}x
          </option>
        ))}
      </select>
      {isPlaying || isPaused ? (
        <button
          type='button'
          className='blog-audio-player__stop'
          onClick={handleStop}
          aria-label='Stop blog audio'
        >
          x
        </button>
      ) : null}
      {!isSupported ? (
        <span className='blog-audio-player__message'>Audio is not supported in this browser.</span>
      ) : null}
    </div>
  )
}
