// RTE : this is real time editor, which will be displayed inside each post, we will design this component individually

import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import conf from '../conf/conf'

export default function RTE({name, control, label, defaultValue=""}) {
    // this parameter passed "control" is responsible for passing the cotrol from here to the post where this editor is

  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

        <Controller
            name={name || "Content"}
            control={control}
            render={({field: {onChange}}) => (
                <Editor
                initialValue={defaultValue}
                apiKey={conf.tinyMCE}
                init={{
                    initialValue: defaultValue,
                    height: 500, //automatically assumes px
                    menubar: true,
                    plugins: [
                        "image",
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                        "anchor",
                    ],
                    toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help", 
                    content_style: "body { font-family: Helvetica, Arial,sans-serif; font-size:14px }"
                }}
                onEditorChange={onChange}
                />
            )}
        />
    </div>
  )
} 






