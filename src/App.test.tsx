import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

const handleClickLoadButton = () => {
  const loadButton = screen.getByRole("button", {
    name: /load issues/i,
  });
  fireEvent.click(loadButton);
};

const changeInput = (searchBar: HTMLInputElement, value: string) => {
  fireEvent.change(searchBar, {
    target: { value: value },
  });
};

describe("Search Bar", () => {
  test("Checks if the typing works", () => {
    render(<App />);

    const searchBar: HTMLInputElement =
      screen.getByPlaceholderText(/enter repo url/i);

    changeInput(searchBar, "https://github.com/facebook/react");

    expect(searchBar.value).toBe("https://github.com/facebook/react");
  });

  describe("Integration with RepoInfo", () => {
    test("If we enter the link with existing repo of existing repo owner we get links to both of them", async () => {
      render(<App />);

      const searchBar: HTMLInputElement =
        screen.getByPlaceholderText(/enter repo url/i);

      changeInput(searchBar, "https://github.com/facebook/react");

      handleClickLoadButton();

      await waitFor(() => {
        const repoOwner = screen.getByRole("link", {
          name: /facebook/i,
        });
        const repoName = screen.getByRole("link", { name: /react/i });

        expect(repoOwner).toBeInTheDocument();
        expect(repoName).toBeInTheDocument();
      });
    });

    test("If we enter the link with non-existing repo we get a message that no issues are loaded with no links", async () => {
      render(<App />);

      const searchBar: HTMLInputElement =
        screen.getByPlaceholderText(/enter repo url/i);

      changeInput(searchBar, "https://github.com/non_existant_user/react");

      handleClickLoadButton();

      await waitFor(() => {
        const repoOwner = screen.queryByRole("link", {
          name: /facebook/i,
        });
        const repoName = screen.queryByRole("link", { name: /react/i });
        const noLoaded = screen.getByText(/No issues loaded/i);

        expect(repoOwner).not.toBeInTheDocument();
        expect(repoName).not.toBeInTheDocument();
        expect(noLoaded).toBeInTheDocument();
      });
    });
  });

  describe("Search bar clearing", () => {
    test("Search bar must clear if we pass a valid URL and press a load issues button", async () => {
      render(<App />);

      const searchBar: HTMLInputElement =
        screen.getByPlaceholderText(/enter repo url/i);

      changeInput(searchBar, "https://github.com/facebook/react");

      handleClickLoadButton();

      await waitFor(() => {
        expect(searchBar.value).toBe("");
      });
    });

    test("Search bar must clear if we pass a valid URL and press enter", () => {
      render(<App />);

      const searchBar: HTMLInputElement =
        screen.getByPlaceholderText(/enter repo url/i);

      changeInput(searchBar, "https://github.com/facebook/react");

      fireEvent.keyDown(searchBar, {
        key: "Enter",
        code: "Enter",
        charCode: 13,
      });

      expect(searchBar.value).toBe("");
    });

    describe("Search bar must not clear if we pass an invalid URL", () => {
      test("URL is invalid if it doesn't have github.com/", () => {
        render(<App />);

        const searchBar: HTMLInputElement =
          screen.getByPlaceholderText(/enter repo url/i);

        changeInput(searchBar, "https://dou.ua/facebook/react");

        handleClickLoadButton();

        expect(searchBar.value).not.toBe("");
      });

      test("URL is invalid if passed owner doesn't exist or they don't have such repo", () => {
        render(<App />);

        const searchBar: HTMLInputElement =
          screen.getByPlaceholderText(/enter repo url/i);

        changeInput(
          searchBar,
          "https://github.com/facebook/some_inexistant_repo"
        );

        handleClickLoadButton();

        expect(searchBar.value).not.toBe("");
      });

      test("URL is invalid if it doesn't have two subdirectories", () => {
        render(<App />);

        const searchBar: HTMLInputElement =
          screen.getByPlaceholderText(/enter repo url/i);

        changeInput(searchBar, "https://github.com/facebook");

        handleClickLoadButton();

        expect(searchBar.value).not.toBe("");
      });

      test("URL is valid if it has two OR MORE subdirectories", async () => {
        render(<App />);

        const searchBar: HTMLInputElement =
          screen.getByPlaceholderText(/enter repo url/i);

        changeInput(
          searchBar,
          "https://github.com/facebook/react/react-subdirectory"
        );

        handleClickLoadButton();

        await waitFor(() => {
          expect(searchBar.value).toBe("");
        });
      });
    });
  });
});
