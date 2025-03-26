"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { PersonalInfo } from "@/types/resume"
import { FormItem, FormLabel, FormControl, FormMessage, Form, FormField } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

interface PersonalInfoFormProps {
  data: PersonalInfo
  updateData: (data: PersonalInfo) => void
}

// 定义表单验证模式
const formSchema = z.object({
  name: z.string().min(1, { message: "姓名不能为空" }),
  phone: z.string().min(1, { message: "电话不能为空" }),
  email: z.string().email({ message: "请输入有效的邮箱地址" }),
  location: z.string().optional(),
  birthYear: z.string().optional(),
  gender: z.string().optional(),
  status: z.string().optional(),
  targetCities: z.array(z.string()).optional(),
  salaryExpectation: z.string().optional(),
  currentCity: z.string().optional(),
})

export function PersonalInfoForm({ data, updateData }: PersonalInfoFormProps) {
  // 使用React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name || "",
      phone: data.phone || "",
      email: data.email || "",
      location: data.location || "",
      birthYear: data.birthYear || "",
      gender: data.gender || "",
      status: data.status || "",
      targetCities: data.targetCities || [],
      salaryExpectation: data.salaryExpectation || "",
      currentCity: data.currentCity || "",
    },
  })

  // 当外部数据变化时更新表单，但不重置整个表单
  useEffect(() => {
    // 只有当数据实际变化时才更新表单值
    if (data.name !== form.getValues("name")) {
      form.setValue("name", data.name || "")
    }
    if (data.phone !== form.getValues("phone")) {
      form.setValue("phone", data.phone || "")
    }
    if (data.email !== form.getValues("email")) {
      form.setValue("email", data.email || "")
    }
    if (data.location !== form.getValues("location")) {
      form.setValue("location", data.location || "")
    }
    if (data.birthYear !== form.getValues("birthYear")) {
      form.setValue("birthYear", data.birthYear || "")
    }
    if (data.gender !== form.getValues("gender")) {
      form.setValue("gender", data.gender || "")
    }
    if (data.status !== form.getValues("status")) {
      form.setValue("status", data.status || "")
    }
    if (data.salaryExpectation !== form.getValues("salaryExpectation")) {
      form.setValue("salaryExpectation", data.salaryExpectation || "")
    }
    if (data.currentCity !== form.getValues("currentCity")) {
      form.setValue("currentCity", data.currentCity || "")
    }
    // 不要重置整个表单，这会导致输入框失去焦点
  }, [data, form])

  // 表单提交处理
  function onSubmit(values: z.infer<typeof formSchema>) {
    updateData({
      ...values,
      currentCity: values.currentCity || data.currentCity || "",
      targetCities: values.targetCities || [],
    })
  }

  // 使用防抖来减少更新频率
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  // 表单值变化时自动保存，使用防抖减少更新频率
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (Object.values(form.formState.errors).length === 0) {
        // 清除之前的定时器
        if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current)
        }

        // 设置新的定时器，延迟更新
        debounceTimeout.current = setTimeout(() => {
          updateData({
            ...data,
            ...value,
            targetCities: value.targetCities || [],
            currentCity: value.currentCity || data.currentCity || "",
          })
        }, 500) // 500ms 的防抖延迟
      }
    })

    return () => {
      subscription.unsubscribe()
      // 清除定时器
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
    }
  }, [form, updateData, data])

  // 处理目标城市输入
  const handleTargetCitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cities = e.target.value.split(/[,，]/).filter((city) => city.trim() !== "")
    form.setValue("targetCities", cities, { shouldValidate: true })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  姓名 <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="请输入姓名" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  电话 <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="请输入电话号码" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  邮箱 <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="请输入邮箱地址" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>现居城市</FormLabel>
                <FormControl>
                  <Input placeholder="请输入现居城市" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>出生年份</FormLabel>
                <FormControl>
                  <Input placeholder="例如：1998" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>性别</FormLabel>
                <FormControl>
                  <RadioGroup value={field.value} onValueChange={field.onChange} className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="男" id="male" />
                      <Label htmlFor="male">男</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="女" id="female" />
                      <Label htmlFor="female">女</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>当前状态</FormLabel>
                <FormControl>
                  <Input placeholder="例如：在职，正在找工作" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>当前城市</FormLabel>
                <FormControl>
                  <Input placeholder="例如：深圳" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <Label htmlFor="targetCities">意向城市</Label>
            <Input
              id="targetCities"
              name="targetCities"
              value={form.getValues("targetCities")?.join(", ") || ""}
              onChange={handleTargetCitiesChange}
              placeholder="例如：深圳，广州（用逗号分隔）"
            />
          </div>

          <FormField
            control={form.control}
            name="salaryExpectation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>期望薪资</FormLabel>
                <FormControl>
                  <Input placeholder="例如：15k-20k" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}

