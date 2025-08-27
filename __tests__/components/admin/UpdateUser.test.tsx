import { describe, vi } from "vitest";
import UpdateUserForm from "../../../components/admin/forms/UpdateUserForm";
import { render, screen } from "@testing-library/react";
import UpdateUser from "../../../components/admin/UpdateUser";
import { Role, User } from "@prisma/client";

vi.mock("@/components/ui/card", () => ({
  Card: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card">{children}</div>
  ),
  CardHeader: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className: string;
  }) => (
    <div data-testid="card-header" className={className}>
      {children}
    </div>
  ),
  CardTitle: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-title">{children}</div>
  ),
  CardContent: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className: string;
  }) => (
    <button data-testid="card-content" className={className} {...props}>
      {children}
    </button>
  ),
}));

// Mock UpdateUserForm component
vi.mock("../../../components/admin/forms/UpdateUserForm", () => ({
  default: () => <div data-testid="user-form">Update User Form</div>,
}));

describe("Update User", () => {
  // allUsers: User[];
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders 'updateUserForm' component", () => {
    const allUsers = [
      {
        name: "",
        id: "",
        member: "MEMBER",
        image: "",
        email: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ] as User[];
    render(
      <UpdateUser
        allUsers={allUsers}
        setRefresh={vi.fn()}
        setClose={vi.fn()}
        user={allUsers[0].id}
      />
    );

    const updateUserForm = screen.getByText("Update User Form");
    expect(updateUserForm).toBeDefined();
  });

  test("renders card title 'Edit User' header", () => {
    const allUsers = [
      {
        name: "",
        id: "",
        member: "MEMBER",
        image: "",
        email: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ] as User[];
    render(
      <UpdateUser
        allUsers={allUsers}
        setRefresh={vi.fn()}
        setClose={vi.fn()}
        user={allUsers[0].id}
      />
    );

    const editUsersBtn = screen.getByText("Edit Users");
    expect(editUsersBtn).toBeDefined();
  });
});
