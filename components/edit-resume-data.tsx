"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { ResumeData } from "@/types/resume"
import { AlertCircle, Check, Code } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface EditResumeDataProps {
  data: ResumeData
  onSave: (data: ResumeData) => void
}

export function EditResumeData({ data, onSave }: EditResumeDataProps) {
  const [jsonData, setJsonData] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  // 每次data变化或对话框打开时更新jsonData
  useEffect(() => {
    setJsonData(JSON.stringify(data, null, 2))
  }, [data, open])

  const handleSave = () => {
    try {
      const parsedData = JSON.parse(jsonData)
      onSave(parsedData)
      setError(null)
      setSuccess(true)

      // 重置成功状态
      setTimeout(() => {
        setSuccess(false)
        setOpen(false)
      }, 1500)
    } catch (err) {
      setError("JSON格式错误，请检查您的输入")
      setSuccess(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Code className="h-4 w-4" />
          <span>编辑简历数据</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>编辑简历数据 (JSON格式)</DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <Check className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-700">数据已成功保存</AlertDescription>
          </Alert>
        )}

        <Textarea
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          className="font-mono text-sm h-[60vh] resize-none"
        />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button onClick={handleSave}>保存数据</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

