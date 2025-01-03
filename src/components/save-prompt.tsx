'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import FileSaver from 'file-saver'

interface SavePromptProps {
  prompt: string
}

export function SavePrompt({ prompt }: SavePromptProps) {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const blob = new Blob([prompt], { type: 'text/plain;charset=utf-8' })
      FileSaver.saveAs(blob, 'generated_prompt.txt')
    } catch (error) {
      console.error('Failed to save prompt:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Button onClick={handleSave} className="w-full" disabled={isSaving || !prompt}>
      {isSaving ? 'Saving...' : 'Save/Export Prompt'}
    </Button>
  )
}

