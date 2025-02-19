"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function SettingsPage() {
  // Estados para cada campo
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [allergies, setAllergies] = useState("");

  // Estado de carga del formulario
  const [isLoading, setIsLoading] = useState(true);
  // Estado de actualización (loader en el botón)
  const [isUpdating, setIsUpdating] = useState(false);

  // Precargar datos del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/user");
        if (!res.ok) {
          throw new Error("Error al obtener datos del usuario");
        }
        const data = await res.json();

        setName(data.display_name || "");
        setEmail(data.email || "");
        setAge(data.age ? data.age.toString() : "");
        setWeight(data.weight ? data.weight.toString() : "");
        setGender(data.gender || "");
        setHeight(data.height ? data.height.toString() : "");
        setAllergies(data.allergies ? data.allergies.join(", ") : "");
      } catch (error) {
        console.error("No se pudieron cargar los datos del usuario", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Función para actualizar datos del usuario
  const handleUpdateProfile = async (e: any) => {
    e.preventDefault();
    setIsUpdating(true);

    const updatedData = {
      name,
      email,
      age: Number(age),
      weight: Number(weight),
      gender,
      height: Number(height),
      allergies: allergies
        .split(",")
        .map((allergy) => allergy.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) {
        throw new Error("Error al actualizar datos del usuario");
      }
      toast({
        title: "Profile updated",
        description: "Your account information has been updated",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Loader de precarga del formulario
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-900">
        <Loader2 className="h-11 w-11 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white text-gray-900 min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p className="text-gray-600 mb-6">Update your account information</p>

      <form onSubmit={handleUpdateProfile} className="space-y-6">
        {/* Nombre */}
        <div className="grid gap-1">
          <Label htmlFor="name" className="text-sm font-medium">
            Name
          </Label>
          <Input
            id="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className="text-xs text-gray-500">
            This is your public display name.
          </p>
        </div>

        {/* Correo */}
        <div className="grid gap-1">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-xs text-gray-500">
            You can manage verified emails in your email settings.
          </p>
        </div>

        {/* Edad */}
        <div className="grid gap-1">
          <Label htmlFor="age" className="text-sm font-medium">
            Age
          </Label>
          <Input
            id="age"
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        {/* Peso */}
        <div className="grid gap-1">
          <Label htmlFor="weight" className="text-sm font-medium">
            Weight (kg)
          </Label>
          <Input
            id="weight"
            type="number"
            placeholder="Enter your weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        {/* Género */}
        <div className="grid gap-1">
          <Label htmlFor="gender" className="text-sm font-medium">
            Gender
          </Label>
          <Select onValueChange={setGender} value={gender}>
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select a gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Estatura */}
        <div className="grid gap-1">
          <Label htmlFor="height" className="text-sm font-medium">
            Height (cm)
          </Label>
          <Input
            id="height"
            type="number"
            placeholder="Enter your height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <div>
          <Button type="submit" disabled={isUpdating} className="w-full">
            {isUpdating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update profile"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
