import { BlogCardProps } from "./BlogCard.props";
import { Button, Flex } from "antd";
import { Image } from "antd";
import styles from "./BlogCard.module.css";
import { Typography } from "antd";
import router from "next/router";

function BlogCard({ id, image, title, description, date }: BlogCardProps) {
  const { Title } = Typography;

  return (
    <Flex gap="middle" align="center" justify="center" flex="1 1 10%" vertical>
      <Button
        type="primary"
        className={styles["button"]}
        size="large"
        onClick={() => router.back()}
      >
        back
      </Button>
      {/* </Link> */}
      <Flex style={{ width: "30%" }} vertical key={id}>
        <div className={styles[""]}>
          <Image src={image} width={400} height={300} alt="image" />
        </div>
        <div>
          <Title level={1}>{title}</Title>
          <Title level={3}>{description}</Title>
          <p>
            {new Date(date).toLocaleString("ru", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </p>
        </div>
      </Flex>
    </Flex>
  );
}
export default BlogCard;
