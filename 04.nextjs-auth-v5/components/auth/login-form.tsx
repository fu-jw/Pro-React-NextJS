import { CardWrapper } from "@/components/auth/card-wrapper";

export const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="欢迎回来"
      backBtnLabel="免费注册"
      backBtnHref="/auth/register"
      showSocial
    >
      LoginForm
    </CardWrapper>
    
  );
};
