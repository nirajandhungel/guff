import React from "react";
import { X, Image, Send } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const MessageInput = () => {
  const [text, setText] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState(null); // 👈 new state for the file
  const [imagePreview, setImagePreview] = React.useState(null);
  const fileInputRef = React.useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setSelectedFile(file); // 👈 store the file itself
    }
  };
  const removeImage = () => {
    if(imagePreview) URL.revokeObjectURL(imagePreview); // free up memory
    setImagePreview(null);
    setSelectedFile(null);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !selectedFile) return; // prevent sending empty messages

    let base64Image = null;
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = async () => {
        base64Image = reader.result;
        await sendMessage({ message: text, image: base64Image });
        setText("");
        removeImage();
      };
      return;//wait for reader
    }
    // if no image, just send text
    await sendMessage({ message: text, image: null });
    setText("");
    removeImage();
    
  }


  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`hidden sm:flex btn btn-circle${
              imagePreview ? "text-emerald-500" : "text-zinc-400"
            }`}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-sm sm:btn-md"
          disabled={!text.trim() && !selectedFile}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
