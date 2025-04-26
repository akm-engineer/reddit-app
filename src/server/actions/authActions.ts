"use server"
import { kyInstance } from "@/lib/ky"
import { BASEURL } from ".."
import { loginSchema, type LoginValues } from "../validations"

export const login = async ({ input }: { input: LoginValues }) => {
  try {
    const { email, password } = loginSchema.parse(input)

    const res = await kyInstance
      .post(`${BASEURL}/auth/login`, {
        json: { email, password },
      })
      .json()

    return res
  } catch (error) {
    console.error(error)
    return {
      error: "Something went wrong, please try again.",
    }
  }
}

export const signUp = async ({ input }: { input: LoginValues }) => {
  try {
    const { email, password } = loginSchema.parse(input)

    const res = await kyInstance
      .post(`${BASEURL}/auth/signup`, {
        json: { email, password },
      })
      .json()

    return res
  } catch (error) {
    console.error(error)
    return {
      error: "Something went wrong, please try again.",
    }
  }
}
