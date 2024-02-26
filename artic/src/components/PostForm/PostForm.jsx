import { useEffect, useRef, useState } from "react";
import { Input, Button, RTE, Select } from "../index";
import { useForm } from "react-hook-form";
import appwriteService from "../../appwrite/config.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const userData = useSelector((state) => state.auth.userData);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const submit = async (data) => {
    try {
      // if(data.some(item => item === undefined)){
      //   setErrorMsg("Please fill all required fields")
      //   return
      // }
      // console.log("data", data);
      // console.log("post", post);
      if (post) {
        const { title, featuredImage, content, status } = data;
        if (post?.featuredImage && featuredImage) {
          const previewFile = appwriteService.getFilePreview(
            post?.featuredImage
          );
          if (previewFile) {
            const deletedFile = appwriteService.deleteFile(post?.featuredImage);
            if (!deletedFile) {
              setErrorMsg("image change failed, please try again");
              // return;
            }
          }
        }
        
          const file = await appwriteService.fileUpload(featuredImage[0]);
          if (!file) {
            setErrorMsg("image upload failed, please try again");
            return;
          }
          const fileId = file?.$id;
        // update
        const res = await appwriteService.updatePost(post?.$id, {
          title,
          featuredImage: fileId|| post?.featuredImage,
          content,
          status,
        });
        if (res) {
          console.log("res", res);
          navigate("/post/" + post?.$id);
        }
      } else {
        // create
        const file = await appwriteService.fileUpload(data?.featuredImage[0]);
        if (!file) {
          setErrorMsg("image upload failed, please try again");
        }
        const fileId = file?.$id;
        data.featuredImage = fileId;
        const res = await appwriteService.createPost(
          { ...data },
          userData?.$id
        );
        if (res) {
          navigate("/post/" + data?.slug);
        }
      }
    } catch (error) {
      console.log(error);
      appwriteService.deleteFile(post?.featuredImage);
    }
  };

  useEffect(() => {
    const subscribe = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", value.title.toLowerCase().replaceAll(" ", "-"), {
          shouldValidate: true,
        });
        // console.log("object", value.title.toLowerCase().replaceAll(" ", "-"));
      }
    });
    return () => {
      subscribe.unsubscribe();
    };
  }, [watch, setValue]);
  useEffect(() => {
    if (post) {
      setValue("title", post.title || "");
      setValue("slug", post.$id || "");
      setValue("content", post.content || "");
      setValue("status", post.status || "active");
    }
    // console.log(post)
    // console.log("title",getValues("title"))
    // console.log("content",getValues("content"))
    // console.log("slug",getValues("slug"))
    // console.log("status",getValues("status"))
  }, [post, setValue]);

  return (
    <div>
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        {/* <form onSubmit={handleSubmit(()=>console.log(data))} className="flex flex-wrap"> */}
        <div className="w-2/3">
          <Input
            label="Title"
            name="title"
            {...register("title", { required: true })}
            placeholder="Title"
            defaultValue={watch("title")}
            isRequired
          />
          {errors.title && (
            <p className="text-red-500 mb-5">Title is required</p>
          )}
          <Input
            label="Slug"
            name="slug"
            {...register("slug", { required: true })}
            disabled
            onInput={(e) =>
              setValue("slug", e.currentTarget.value, { shouldValidate: true })
            }
            placeholder="Slug"
            defaultValue={watch("slug")}
            isRequired
          />
          {errors.slug && <p className="text-red-500 mb-5">Slug is required</p>}
          {/* <RTE name="content" control={control} defaultValue={post?.content}/> */}
          <RTE
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
          {errors.content && (
            <p className="text-red-500 mb-5">Content is required</p>
          )}
        </div>
        <div className="w-1/3">
          <Input
            type="file"
            label="Image"
            name="featuredImage"
            {...register("featuredImage", { required: post ? false : true })}
            // defaultValue={watch("featuredImage")}
            isRequired={post ? false : true}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
          {errors.featuredImage && (
            <p className="text-red-500 mb-5">Image is required</p>
          )}
          <Select
            label={"Status"}
            name="status"
            {...register("status", { required: true })}
            defaultValue={watch("status")}
            options={["active", "inactive"]}
            isRequired
          />
          {errors.status && (
            <p className="text-red-500 mb-5">Status is required</p>
          )}
          <div className=" mt-7 mx-auto h-full w-full max-h-fit max-w-fit md:h-[200px] md:w-[300px]">
            <p>Preview</p>
            <img
              src={`${appwriteService.getFilePreview(post?.featuredImage)}`}
              alt={`${post?.title}`}
              className="h-full w-full rounded-md object-cover border border-black shadow-md"
            />
          </div>
        </div>
        {errorMsg && <p className="text-red-500 mb-5">{errorMsg}</p>}
        <Button className={"mt-6"}>
          {post ? "Update Post" : "Create Post"}
        </Button>
      </form>
    </div>
  );
};

export default PostForm;
