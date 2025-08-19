"use client";

import { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send, LoaderCircle } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";

const STARTUP_FIELDS = [
  {
    name: "title",
    title: "Title",
    message: "Title is required",
    placeholder: "Startup Title",
  },
  {
    name: "category",
    title: "Category",
    message: "Category is required",
    placeholder: "Startup Category",
  },
  {
    name: "image",
    title: "Image URL",
    message: "Image URL is required",
    placeholder: "https://example.com/image.jpg",
    attributes: {
      type: "url",
    },
  },
  {
    name: "description",
    title: "Description",
    message: "Description is required",
    element: "textarea",
    placeholder: "Startup Description",
  },
];

interface InitialState {
  title: string;
  description: string;
  image: string;
  category: string;
}

const StartupForm = () => {
  const router = useRouter();
  const [pitch, setPitch] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const initialState: InitialState = {
    title: "",
    description: "",
    category: "",
    image: "",
  };
  const [state, formAction, isPending] = useActionState(submitForm, {
    ...initialState,
    pitch,
    error: "",
    status: "INITIAL",
  });

  async function submitForm(_: any, formData: FormData) {
    const formValues = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      image: formData.get("image") as string,
      category: formData.get("category") as string,
      pitch,
    };
    try {
      await new Promise((resolve) => setTimeout(resolve, 20000));
      await formSchema.parseAsync(formValues);
      // const res = await createIdea(previousState, formValues);
      toast.success("Your Startup Pitch has been created successfully");
      setErrors({});
      router.push("/");
      {
        return {
          ...formValues,
          status: "SUCCESS",
          error: "",
        };
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const { fieldErrors } = z.flattenError(error);
        console.log(fieldErrors);
        setErrors(fieldErrors);
        toast.error("Please fill all the fields");
        return {
          ...formValues,
          error: "Please fill all the fields",
          status: "ERROR",
        };
      } else {
        toast.error("Something went wrong");
        return {
          ...formValues,
          error: "Something went wrong",
          status: "ERROR",
        };
      }
    }
  }

  return (
    <form className="startup-form" action={formAction}>
      {STARTUP_FIELDS.map(
        ({ name, title, element, attributes = {}, placeholder }) => {
          const isInput = element === undefined;
          const Element = isInput ? Input : Textarea;
          return (
            <div key={name}>
              <label htmlFor={name} className="startup-form_label">
                {title}
              </label>
              <Element
                id={name}
                name={name}
                className={`startup-form_${isInput ? "input" : "textarea"}`}
                placeholder={placeholder}
                required={true}
                defaultValue={(state as any)[name] || ""}
                {...attributes}
              />
              {errors[name] && (
                <p className="startup-form_error">{errors[name]}</p>
              )}
            </div>
          );
        },
      )}
      <div>
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(v) => setPitch(v!)}
          className="startup-form_editor"
          preview="edit"
          height={300}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves.",
            id: "pitch",
          }}
          previewOptions={{
            disallowedElements: ["script", "style", "iframe"],
          }}
        />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>
      <Button
        disabled={isPending}
        type="submit"
        className="startup-form_btn text-white"
      >
        {isPending ? (
          <>
            Submiting your pitch
            <LoaderCircle className="mr-3 size-5.5 animate-spin text-white" />
          </>
        ) : (
          <>
            Submit Your Pitch <Send />
          </>
        )}
      </Button>
    </form>
  );
};
export default StartupForm;
