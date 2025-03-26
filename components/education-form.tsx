"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Education } from "@/types/resume"
import { Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface EducationFormProps {
  data: Education[]
  updateData: (data: Education[]) => void
}

export function EducationForm({ data, updateData }: EducationFormProps) {
  const [educations, setEducations] = useState<Education[]>(data)
  const [newEducation, setNewEducation] = useState<Education>({
    school: "",
    department: "",
    degree: "",
    startDate: "",
    endDate: "",
    location: "",
  })

  const { toast } = useToast()

  const handleAddEducation = () => {
    if (!newEducation.school) {
      toast({
        title: "无法添加",
        description: "学校名称不能为空",
        variant: "destructive",
      })
      return
    }

    if (!newEducation.department) {
      toast({
        title: "无法添加",
        description: "院系专业不能为空",
        variant: "destructive",
      })
      return
    }

    const updatedEducations = [...educations, newEducation]
    setEducations(updatedEducations)
    updateData(updatedEducations)
    setNewEducation({
      school: "",
      department: "",
      degree: "",
      startDate: "",
      endDate: "",
      location: "",
    })
  }

  const handleRemoveEducation = (index: number) => {
    const updatedEducations = educations.filter((_, i) => i !== index)
    setEducations(updatedEducations)
    updateData(updatedEducations)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewEducation((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {educations.map((education, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">{education.school}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => handleRemoveEducation(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">院系专业：</p>
                  <p className="text-sm">{education.department}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">学位：</p>
                  <p className="text-sm">{education.degree}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">时间段：</p>
                  <p className="text-sm">
                    {education.startDate} - {education.endDate}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">地点：</p>
                  <p className="text-sm">{education.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="border p-4 rounded-lg">
        <h3 className="font-medium mb-4">添加教育经历</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="school">学校名称</Label>
            <Input
              id="school"
              name="school"
              value={newEducation.school}
              onChange={handleChange}
              placeholder="例如：华南农业大学珠江学院"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">院系专业</Label>
            <Input
              id="department"
              name="department"
              value={newEducation.department}
              onChange={handleChange}
              placeholder="例如：计算机科学与技术 本科"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="degree">学位</Label>
            <Input
              id="degree"
              name="degree"
              value={newEducation.degree}
              onChange={handleChange}
              placeholder="例如：本科"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">地点</Label>
            <Input
              id="location"
              name="location"
              value={newEducation.location}
              onChange={handleChange}
              placeholder="例如：广州"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">开始时间</Label>
            <Input
              id="startDate"
              name="startDate"
              value={newEducation.startDate}
              onChange={handleChange}
              placeholder="例如：2017年01月"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">结束时间</Label>
            <Input
              id="endDate"
              name="endDate"
              value={newEducation.endDate}
              onChange={handleChange}
              placeholder="例如：2021年01月"
            />
          </div>
        </div>

        <Button className="mt-4" onClick={handleAddEducation}>
          添加教育经历
        </Button>
      </div>
    </div>
  )
}

