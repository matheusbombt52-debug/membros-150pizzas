import { createFileRoute, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Shell } from "@/components/Shell";
import { getUser } from "@/lib/store";

export const Route = createFileRoute("/membros")({
  component: MembersLayout,
});

function MembersLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    if (!getUser()) navigate({ to: "/" });
  }, [navigate]);
  return (
    <Shell>
      <div key={pathname} className="page-enter">
        <Outlet />
      </div>
    </Shell>
  );
}
