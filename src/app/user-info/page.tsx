"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Definir el esquema de validación con Zod
const formSchema = z.object({
  age: z
    .number({ invalid_type_error: "Please enter a valid age" })
    .min(1, "Age is required")
    .max(120, "Age cannot be greater than 120"),
  gender: z.string({ invalid_type_error: "Please select your gender" }),
  weight: z
    .number({ invalid_type_error: "Please enter a valid weight" })
    .min(1, "Weight is required")
    .max(300, " Weight cannot be greater than 300 kg"),
  height: z
    .number({ invalid_type_error: "Please enter a valid heigth" })
    .min(50, "Height is required")
    .max(250, "Height cannot be greater than 250 cm"),
  allergie: z.array(z.string()).default([]),
});

type FormValues = z.infer<typeof formSchema>;

export default function Formulario() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      allergie: [],
      gender: "", // Valor inicial vacío
    },
  });

  const { toast } = useToast();
  const alergias = watch("allergie");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al guardar los datos");
      }

      const result = await response.json();
      toast({
        title: "Congrats!",
        description: "User information saved successfully",
      });

      window.location.href = "/home";
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while saving the user information",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-center text-2xl font-semibold">
            User Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <Input
                type="number"
                placeholder="Enter your age"
                {...register("age", { valueAsNumber: true })}
                className="w-full"
              />
              {errors.age && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.age.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full px-3 py-2 border rounded">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg)
              </label>
              <Input
                type="number"
                placeholder="Enter your weight"
                {...register("weight", { valueAsNumber: true })}
                className="w-full"
              />
              {errors.weight && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.weight.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height (cm)
              </label>
              <Input
                type="number"
                placeholder="Enter your height"
                {...register("height", { valueAsNumber: true })}
                className="w-full"
              />
              {errors.height && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.height.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full py-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
