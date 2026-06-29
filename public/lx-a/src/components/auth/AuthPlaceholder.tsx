import { AuthLayout } from "./AuthLayout";
import { ChevronLeft } from "../icons";

export function AuthPlaceholder({
  title,
  onBack,
}: {
  title: string;
  onBack: () => void;
}) {
  return (
    <AuthLayout>
      <button className="crumb auth__back" onClick={onBack}>
        <ChevronLeft width={15} height={15} /> Back to log in
      </button>
      <p className="auth__eyebrow">
        <span className="tick" /> Encore
      </p>
      <h1 className="auth__title">{title}</h1>
      <p className="auth__sub">
        This screen is part of the prototype roadmap — the design will be added
        next.
      </p>
    </AuthLayout>
  );
}
