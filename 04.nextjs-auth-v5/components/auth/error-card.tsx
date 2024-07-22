// import { Header } from "@/components/auth/header";
// import { BackBtn } from "@/components/auth/back-btn";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
  return (
    // 写法一：
    // <Card className="w-full">
    //   <CardHeader>
    //     <Header label="登录失败 o(╥﹏╥)o" />
    //   </CardHeader>

    //   <CardContent className="flex flex-col gap-y-4 items-center justify-center">
    //     <CardTitle className="text-lg font-semibold">
    //       Login failed, please try again.
    //     </CardTitle>

    //     <CardDescription>
    //       We are sorry, but we were unable to log you in. Please try again
    //       later.
    //     </CardDescription>
    //   </CardContent>

    //   <CardFooter>
    //     <BackBtn label="返回登录页面" href="/auth/login" />
    //   </CardFooter>
    // </Card>

    // 写法二：
    <CardWrapper
      headerLabel="登录失败 o(╥﹏╥)o"
      backBtnLabel="返回登录页面"
      backBtnHref="/auth/login"
      showSocial={false}
    >
      <div className="w-full flex items-center justify-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
