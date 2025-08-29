export const formError = (data) => {
  if (!data?.name) return "Name is required";
  if (!data?.email) return "Email is required";
  if (!data?.password) return "Password is required";
  return null;
};

export function getFirebaseErrorMessage(error) {
  if (!error) return "An unknown error occurred";

  const match = error.match?.(/\(auth\/[^\)]+\)/);
  if (!match) return "Something went wrong, please try again";

  const code = match[0].replace(/[()]/g, "");

  switch (code) {
    case "auth/email-already-in-use":
      return "Bu email allaqachon ro'yxatdan o'tgan!";
    case "auth/weak-password":
      return "Parol juda qisqa. Iltimos, kuchliroq parol tanlang!";
    case "auth/invalid-email":
      return "Email noto‘g‘ri kiritilgan!";
    case "auth/user-not-found":
      return "Bunday foydalanuvchi topilmadi!";
    case "auth/wrong-password":
      return "Parol noto‘g‘ri kiritilgan!";
    case "auth/invalid-credential":
      return "Kiritilgan ma'lumotlar noto‘g‘ri!";
    default:
      return "Noma'lum xatolik yuz berdi, qaytadan urinib ko‘ring!";
  }
}
