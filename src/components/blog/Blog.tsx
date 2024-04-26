import Link from "next/link";
import styles from "./Blog.module.css";
import { BlogProps } from "./Blog.props";
import { Typography } from "antd";
import Image from "next/image";

function Blog({ id, image, title, date }: BlogProps) {
  const { Title } = Typography;
  return (
    <Link href={`/posts/${id}`}>
      <div key={id}>
        <div>
          <Image
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60oe8gAAAABJRU5ErkJggg=="
            placeholder="blur"
            src={image}
            alt="image"
            width={200}
            height={150}
          />
        </div>
        <div>
          <Title>{title}</Title>
          <p>
            {new Date(date).toLocaleString("ru", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </p>
        </div>
      </div>
    </Link>
  );
}
export default Blog;
