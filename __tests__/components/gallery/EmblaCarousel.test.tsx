import { vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import EmblaCarousel from "../../../components/gallery/EmblaCarousel";
import { GetAllImages } from "@/lib/types";
import { useModal } from "@/providers/modal-provider";

// Move all mock functions inside the vi.mock calls or use vi.fn() directly
vi.mock("embla-carousel-auto-scroll", () => ({
  default: vi.fn(() => ({
    // Mock the AutoScroll plugin methods if needed
    init: vi.fn(),
    destroy: vi.fn(),
  })),
}));

vi.mock("embla-carousel-react", () => ({
  default: vi.fn(() => [
    // Mock embla ref
    { current: null },
    // Mock embla API
    {
      scrollTo: vi.fn(),
      canScrollNext: vi.fn(() => true),
      canScrollPrev: vi.fn(() => true),
      on: vi.fn(() => ({
        on: vi.fn(() => ({
          on: vi.fn(() => ({})), // Chain for multiple .on() calls
        })),
      })),
      off: vi.fn(),
      plugins: vi.fn(() => ({
        autoScroll: {
          isPlaying: vi.fn(() => true),
          play: vi.fn(),
          stop: vi.fn(),
        },
      })),
    },
  ]),
}));

vi.mock("@/global/custom-modal", () => ({
  default: ({ className }: { className?: string; apiEndpoint?: string }) => (
    <div data-testid="custom-modal" className={className}>
      Custom Modal Component
    </div>
  ),
}));

vi.mock("@/providers/modal-provider", () => ({
  useModal: vi.fn(() => ({
    setOpen: vi.fn(),
  })),
}));

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: any) => (
    <img data-testid="next-image" src={src} alt={alt} {...props} />
  ),
}));

const mockSlides: GetAllImages = [
  {
    link: "/test-image-1.jpg",
    name: "Test image 1",
  },
  {
    link: "/test-image-2.jpg",
    name: "Test image 2",
  },
];

describe("EmblaCarousel Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders carousel with images", () => {
    render(<EmblaCarousel slides={mockSlides} />);

    // Check if images are rendered
    const images = screen.getAllByTestId("next-image");
    expect(images.length).toBe(2); // Should match mockSlides length
  });

  test("renders carousel container with proper structure", () => {
    render(<EmblaCarousel slides={mockSlides} />);

    // Check for embla viewport
    const viewport = document.querySelector(".embla__viewport");
    expect(viewport).toBeTruthy();

    // Check for embla container
    const container = document.querySelector(".embla__container");
    expect(container).toBeTruthy();
  });

  test("renders play/stop button", () => {
    render(<EmblaCarousel slides={mockSlides} />);

    const button = screen.getByRole("button");
    expect(button).toBeTruthy();
    expect(button.textContent).toMatch(/Stop|Start/);
  });

  test("calls setOpen when image is clicked", () => {
    const mockSetOpen = vi.fn();
    const mockSetClose = vi.fn();

    vi.mocked(useModal).mockReturnValue({
      data: {},
      isOpen: false,
      setOpen: mockSetOpen,
      setClose: mockSetClose,
    });

    render(<EmblaCarousel slides={mockSlides} />);

    const firstImage = screen.getAllByTestId("next-image")[0];
    fireEvent.click(firstImage);

    expect(mockSetOpen).toHaveBeenCalledTimes(1);
    expect(mockSetOpen).toHaveBeenCalledWith(expect.any(Object)); // The CustomModal JSX
  });

  test("handles undefined slides", () => {
    render(<EmblaCarousel slides={undefined} />);

    // Should render without crashing
    const viewport = document.querySelector(".embla__viewport");
    expect(viewport).toBeTruthy();

    // Should not render any images
    const images = screen.queryAllByTestId("next-image");
    expect(images.length).toBe(0);
  });
});
