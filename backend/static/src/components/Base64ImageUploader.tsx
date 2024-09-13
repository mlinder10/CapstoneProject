import styles from "./base64imageuploader.module.css";
import { ChangeEvent } from "react";
import Base64Image, { ImageType } from "./Base64Image";
import { FaImage } from "react-icons/fa";

type Base64ImageUploaderProps = {
  accept?: ImageType[];
  data: string | null;
  setData: (data: string | null) => void;
  width?: number;
  height?: number;
};

export default function Base64ImageUploader({
  accept = ["png"],
  data,
  setData,
  width = 256,
  height = 208,
}: Base64ImageUploaderProps) {
  async function convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve((reader.result as string).split(";base64,")[1]);
      reader.onerror = (error) => reject(error);
    });
  }

  function handleSelection(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file === undefined) return;
    convertToBase64(file).then((base64) => {
      setData(base64);
    });
  }

  return (
    <div className={styles.container}>
      {!data && (
        <label
          htmlFor="image"
          className={styles.label}
          style={{ width, height }}
        >
          Upload an Image
          <FaImage className={styles.icon} fontSize={(height / 3) * 2} />
        </label>
      )}
      <input
        id="image"
        type="file"
        accept={`.${accept.join(", .")}`}
        onChange={handleSelection}
        className={styles.input}
      />
      <Base64Image data={data} style={{ width, height }} />
    </div>
  );
}
