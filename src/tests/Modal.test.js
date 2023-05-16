import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "../components/Modal";

//Cria os Mocks
const activeModalMock = {
  sprites: {
    front_default: "link-mockado",
  },
  id: 7,
  name: "Nome-mockado",
  types: [
    {
      type: {
        name: "fire",
      },
    },
    {
      type: {
        name: "grass",
      },
    },
  ],
  weight: 100,
  height: 10,
};

const closeModalMock = jest.fn();

//Fazer os testes
describe("Testes do Modal", () => {
  test("deve renderizar o componente Modal", () => {
    render(<Modal activeModal={activeModalMock} closeModal={closeModalMock} />);

    //screen.logTestingPlaygroundURL();
  });

  test("deve renderizar os elementos do Modal: imagem, id, name, types, weight, height", () => {
    render(<Modal activeModal={activeModalMock} closeModal={closeModalMock} />);

    //screen.logTestingPlaygroundURL();

    const image = screen.getByRole("img", {
      name: /nome\-mockado/i,
    });
    const id = screen.getByText(/#7/i);
    const name = screen.getByText(/nome\-mockado/i);
    const type1 = screen.getByText(/fire/i);
    const type2 = screen.getByText(/grass/i);
    const weightTitle = screen.getByRole("heading", {
      name: /weight/i,
    });
    const weight = screen.getByText(/10\.0 kg/i);
    const heightTitle = screen.getByRole("heading", {
      name: /height/i,
    });
    const height = screen.getByText(/1\.0 m/i);
    const closeButton = screen.getByRole("button", {
      name: /❌/i,
    });

    expect(image).toBeInTheDocument();
    expect(id).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(type1).toBeInTheDocument();
    expect(type2).toBeInTheDocument();
    expect(weightTitle).toBeInTheDocument();
    expect(weight).toBeInTheDocument();
    expect(heightTitle).toBeInTheDocument();
    expect(height).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });

  test("Deve disparada a função que fecha o modal ao clicar no botão de fechar", async () => {
    const user = userEvent.setup();

    render(<Modal activeModal={activeModalMock} closeModal={closeModalMock} />);

    const closeButton = screen.getByRole("button", {
      name: /❌/i,
    });

    await user.click(closeButton);

    //Checa se a função foi chamada
    expect(closeModalMock).toBeCalled();
    expect(closeModalMock).toHaveBeenCalled();

    //Garante que foi chamada 1x
    expect(closeModalMock).toBeCalledTimes(1);
  });
});
