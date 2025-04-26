"use client"
import { Button } from "@/components/ui/button"
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/ui/prompt-input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { generateFreeVideo } from "@/server/actions/postActions"
import {
  generateFreeVideoSchema,
  type GenerateFreeVideoValues,
} from "@/server/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  AiMicIcon,
  Clock04Icon,
  InstagramIcon,
  SparklesIcon,
  VideoCameraAiIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUp, Paperclip, Square, X } from "lucide-react"
import Link from "next/link"
import { useRef, useState, useTransition } from "react"
import { useForm } from "react-hook-form"

export default function Home() {
  // const {
  //   value,
  //   characterCount,
  //   handleChange,
  //   maxLength: limit,
  // } = useCharacterLimit({ maxLength })

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const uploadInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (input.trim() || files.length > 0) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setInput("")
        setFiles([])
      }, 2000)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    if (uploadInputRef?.current) {
      uploadInputRef.current.value = ""
    }
  }

  const [isPending, startTransition] = useTransition()

  const [error, setError] = useState<string>()

  const form = useForm({
    resolver: zodResolver(generateFreeVideoSchema),
    defaultValues: {
      text: "",
    },
  })

  const onSubmit = async (input: GenerateFreeVideoValues) => {
    setError(undefined)
    startTransition(async () => {
      const res = await generateFreeVideo({ input })
      if (res?.error) {
        setError(res?.error)
      }
    })
  }

  const characterCount = form.watch("text")?.length || 0
  const maxLength = 300

  return (
    <section className="w-full h-full min-h-0 min-w-0 flex flex-col gap-5">
      <Tabs defaultValue="ai-lyrical" className="bg-transparent w-full h-full">
        <TabsList className="bg-transparent flex justify-start items-center h-[16vh] sm:h-[14vh] w-full overflow-x-auto overflow-y-hidden sm:w-fit gap-4 sm:gap-5 lg:gap-8 p-0 rounded-none">
          <TabsTrigger
            value="ai-lyrical"
            className="dark:data-[state=active]:bg-[#1C1C1C] bg-[#1C1C1C] data-[state=active]:text-[#808080] text-[#808080] dark:data-[state=active]:border-2 dark:data-[state=active]:border-[#969494] flex items-center gap-3 w-fit h-fit p-3"
          >
            <div className="bg-[#343333] p-3 sm:p-3.5 rounded-full flex justify-center items-center">
              <HugeiconsIcon
                icon={VideoCameraAiIcon}
                className="size-5 sm:size-6"
              />
            </div>
            AI Lyrical Video
          </TabsTrigger>
          <TabsTrigger
            value="insta"
            className="dark:data-[state=active]:bg-[#1C1C1C] bg-[#1C1C1C] data-[state=active]:text-[#808080] text-[#808080] dark:data-[state=active]:border-2 dark:data-[state=active]:border-[#969494] flex items-center gap-3 w-fit h-fit p-3"
          >
            <div className="bg-[#343333] p-3 sm:p-3.5 rounded-full flex justify-center items-center">
              <HugeiconsIcon
                icon={InstagramIcon}
                className="size-5 sm:size-6"
              />
            </div>
            Insta Videos
          </TabsTrigger>
          <TabsTrigger
            value="popcast"
            className="dark:data-[state=active]:bg-[#1C1C1C] bg-[#1C1C1C] data-[state=active]:text-[#808080] text-[#808080] dark:data-[state=active]:border-2 dark:data-[state=active]:border-[#969494] flex items-center gap-3 w-fit h-fit p-3"
          >
            <div className="bg-[#343333] p-3 sm:p-3.5 rounded-full flex justify-center items-center">
              <HugeiconsIcon icon={AiMicIcon} className="size-5 sm:size-6" />
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <span> Popcast Miniclips</span>
              <span className="text-xs text-white">(Coming Soon)</span>
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ai-lyrical">
          <section className="w-full h-[40dvh] flex justify-center items-center p-1 sm:p-3 lg:p-5 mt-8 -mb-14 sm:-mb-60 sm:my-0 sm:mt-0">
            <div className="w-full sm:w-[80%] lg:w-[50%] h-full border rounded-2xl text-[#808080] bg-[#313131] p-1">
              <div className="flex flex-col justify-start items-start w-full h-full">
                <div className="bg-[#1C1C1C] w-fit h-fit flex items-center justify-center gap-2 rounded-b-none rounded-xl text-sm p-3">
                  <HugeiconsIcon
                    icon={SparklesIcon}
                    size={20}
                    stroke="#1E81F3"
                    fill="#1E81F3"
                    className="border-[#1E81F3]"
                  />
                  AI Lyrical Video
                </div>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full h-full flex flex-col bg-[#1C1C1C] rounded-xl rounded-tl-none"
                >
                  <Textarea
                    className="bg-transparent focus-visible:ring-0 border-none w-full h-full resize-none outline-none"
                    placeholder="Enter your Reddit URL here"
                    // value={value}
                    {...form.register("text")}
                    maxLength={maxLength}
                    // onChange={handleChange}
                    aria-describedby={`input-description`}
                  />
                  <div className="w-full h-fit flex items-end justify-between p-2">
                    <div
                      id={`input-description`}
                      className="pointer-events-none  flex items-center justify-center pe-3 text-xs tabular-nums text-white peer-disabled:opacity-50 p-2"
                      aria-live="polite"
                      role="status"
                    >
                      {characterCount}/{maxLength}
                    </div>
                    <Button
                      // loading={isPending}
                      className="flex gap-2 items-center bg-transparent text-[#808080] hover:bg-transparent ring-1 ring-sidebar-ring"
                      type="button"
                      asChild
                    >
                      <Link href="/edit">
                        <HugeiconsIcon
                          icon={SparklesIcon}
                          size={20}
                          stroke="#1E81F3"
                          fill="#1E81F3"
                          className="border-[#1E81F3]"
                        />
                        Generate Now
                      </Link>
                    </Button>
                  </div>
                  {error && (
                    <p className="text-red-400/70 text-sm p-2">{error}</p>
                  )}
                </form>
              </div>
            </div>
          </section>
        </TabsContent>
        <TabsContent value="insta">
          <section className="w-full h-[40dvh] flex justify-center items-center p-5 my-8">
            <div className="w-full sm:w-[50%] h-full border rounded-2xl text-[#808080] bg-[#313131] p-1">
              <div className="flex flex-col justify-start items-start w-full h-full">
                <PromptInput
                  value={input}
                  onValueChange={setInput}
                  isLoading={isLoading}
                  onSubmit={handleSubmit}
                  className="w-full h-full rounded-xl relative"
                >
                  {files.length > 0 && (
                    <div className="flex flex-wrap gap-2 pb-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="bg-secondary flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
                        >
                          <Paperclip className="size-4" />
                          <span className="max-w-[120px] truncate">
                            {file.name}
                          </span>
                          <button
                            onClick={() => handleRemoveFile(index)}
                            className="hover:bg-secondary/50 rounded-full p-1"
                          >
                            <X className="size-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <PromptInputTextarea
                    placeholder="Ask me anything..."
                    className="w-full "
                  />

                  <PromptInputActions className="flex items-center justify-between gap-2 pt-2 ">
                    <div className="flex gap-2 items-center">
                      <PromptInputAction tooltip="Attach files">
                        <label
                          htmlFor="file-upload"
                          className="hover:bg-secondary-foreground/10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-2xl"
                        >
                          <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload"
                          />
                          <Paperclip className="text-primary size-5" />
                        </label>
                      </PromptInputAction>
                      <PromptInputAction tooltip="Attach files">
                        <div
                          id={`input-description`}
                          className="pointer-events-none  flex items-center justify-center pe-3 text-xs tabular-nums text-white peer-disabled:opacity-50"
                          aria-live="polite"
                          role="status"
                        >
                          {characterCount}/{maxLength}
                        </div>
                      </PromptInputAction>
                    </div>

                    <PromptInputAction
                      tooltip={isLoading ? "Stop generation" : "Send message"}
                    >
                      <Button
                        variant="default"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={handleSubmit}
                      >
                        {isLoading ? (
                          <Square className="size-5 fill-current" />
                        ) : (
                          <ArrowUp className="size-5" />
                        )}
                      </Button>
                    </PromptInputAction>
                  </PromptInputActions>
                </PromptInput>
              </div>
            </div>
          </section>
        </TabsContent>
        <TabsContent value="popcast">
          <section className="w-full h-[40dvh] flex justify-center items-center p-5 my-8">
            <div className="w-[50%] h-full   p-1">
              <div className="flex flex-col justify-center items-center font-mono w-full h-full text-6xl">
                Coming Soon.
              </div>
            </div>
          </section>
        </TabsContent>
      </Tabs>

      <div className="w-full rounded-xl p-3 bg-[#1C1C1C] flex flex-col justify-between items-start gap-y-2 mb-24 sm:mb-2">
        <div className="text-[#A7A7A7] flex gap-1.5 items-center text-sm w-fit">
          <HugeiconsIcon icon={Clock04Icon} size={20} />
          <span>Recent videos</span>
        </div>

        <div className="w-full h-40 flex items-center justify-start px-2 gap-6 overflow-x-auto overflow-y-hidden">
          {[1, 2, 3, 4].map((_, i) => (
            <div
              key={i}
              className="bg-[url(/media/video-cover.png)] aspect-video flex-none rounded-lg w-56 h-36 relative ring-4 ring-black"
            >
              <div className="flex flex-col absolute bottom-2 left-2">
                <p className="text-white font-semibold text-sm">
                  The best Podcast ever!!
                </p>
                <p className="text-[#B1B1B1] text-xs">2 Days Ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
