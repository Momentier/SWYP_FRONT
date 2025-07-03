import { User } from "@/store/useAuthStore";
import Header from "../Header";
import Main from "@/app/main/page";
import { COMMON_IMAGES } from "@/utils/imagePath";

export default function MainPage() {
  const mockUser: User = {
    userName: 'Jane Doe',
    accessToken: 'dummy-access-token',
    profileImage: COMMON_IMAGES.AVATAR,
    expiresIn: 100000
  };

  return (
    <>
      <Header user={mockUser} onClickLogo={() => { }} />
      <Main />
    </>
  )
}