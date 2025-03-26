"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Skill } from "@/types/resume"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface SkillsFormProps {
  data: Skill[]
  updateData: (data: Skill[]) => void
}

export function SkillsForm({ data, updateData }: SkillsFormProps) {
  const [skills, setSkills] = useState<Skill[]>(data)
  const [newSkill, setNewSkill] = useState<Skill>({
    name: "",
    level: "熟练",
  })

  const { toast } = useToast()

  const handleAddSkill = () => {
    if (!newSkill.name) {
      toast({
        title: "无法添加",
        description: "技能名称不能为空",
        variant: "destructive",
      })
      return
    }

    const updatedSkills = [...skills, newSkill]
    setSkills(updatedSkills)
    updateData(updatedSkills)
    setNewSkill({
      name: "",
      level: "熟练",
    })
  }

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index)
    setSkills(updatedSkills)
    updateData(updatedSkills)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 min-h-[100px]">
        {skills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="text-sm py-2 px-3">
            {skill.name} ({skill.level})
            <Button variant="ghost" size="icon" className="h-4 w-4 ml-1 p-0" onClick={() => handleRemoveSkill(index)}>
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>

      <div className="border p-4 rounded-lg">
        <h3 className="font-medium mb-4">添加技能</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="skillName">技能名称</Label>
            <Input
              id="skillName"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              placeholder="例如：HTML5, CSS3, JavaScript"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skillLevel">熟练程度</Label>
            <Select value={newSkill.level} onValueChange={(value) => setNewSkill({ ...newSkill, level: value })}>
              <SelectTrigger id="skillLevel">
                <SelectValue placeholder="选择熟练程度" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="了解">了解</SelectItem>
                <SelectItem value="熟悉">熟悉</SelectItem>
                <SelectItem value="熟练">熟练</SelectItem>
                <SelectItem value="精通">精通</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button className="mt-4" onClick={handleAddSkill}>
          添加技能
        </Button>
      </div>
    </div>
  )
}

