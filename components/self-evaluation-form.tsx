"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface SelfEvaluationFormProps {
  data: string[]
  updateData: (data: string[]) => void
}

export function SelfEvaluationForm({ data, updateData }: SelfEvaluationFormProps) {
  const [evaluations, setEvaluations] = useState<string[]>(data)
  const [newEvaluation, setNewEvaluation] = useState("")
  const { toast } = useToast()

  const handleAddEvaluation = () => {
    if (!newEvaluation.trim()) {
      toast({
        title: "无法添加",
        description: "自我评价内容不能为空",
        variant: "destructive",
      })
      return
    }

    const updatedEvaluations = [...evaluations, newEvaluation]
    setEvaluations(updatedEvaluations)
    updateData(updatedEvaluations)
    setNewEvaluation("")
  }

  const handleRemoveEvaluation = (index: number) => {
    const updatedEvaluations = evaluations.filter((_, i) => i !== index)
    setEvaluations(updatedEvaluations)
    updateData(updatedEvaluations)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {evaluations.map((evaluation, index) => (
          <div key={index} className="flex items-start group p-3 border rounded-md">
            <span className="flex-1">{evaluation}</span>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100"
              onClick={() => handleRemoveEvaluation(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="border p-4 rounded-lg">
        <h3 className="font-medium mb-4">添加自我评价</h3>
        <div className="space-y-2">
          <Label htmlFor="evaluation">自我评价</Label>
          <Textarea
            id="evaluation"
            value={newEvaluation}
            onChange={(e) => setNewEvaluation(e.target.value)}
            placeholder="例如：技术热情：持续关注前沿技术，具备快速学习能力，并乐于技术分享"
            rows={4}
          />
        </div>

        <Button className="mt-4" onClick={handleAddEvaluation}>
          添加自我评价
        </Button>
      </div>
    </div>
  )
}

