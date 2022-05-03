import { useEffect, useState, useMemo } from 'react'
import { intervalToDuration } from 'date-fns'

function plural(num, label) {
  return `${num} ${label}${num === 1 ? '' : 's'}`
}

export const useCountdown = (start, end) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(interval)
  })

  const isStarted = now >= start
  const isEnded = now >= end

  const countdownText = useMemo(() => {
    if (!start) return ''
    const { weeks, days, hours, minutes, seconds } = intervalToDuration({
      start: now,
      end: start,
    })

    return [
      weeks && weeks + ':W',
      days + ':D',
      hours + ':H',
      minutes + ':M',
      seconds + ':S',
    ].join(' ')
  }, [start, now])

  const text = (ready && countdownText) || '...'

  return { text, isStarted, isEnded }
}
