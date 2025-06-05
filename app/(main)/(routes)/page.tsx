import { UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <div>
      <UserButton/>
      This is a protected route
    </div>
  );
}
