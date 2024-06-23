import { ProductsMock } from "@/__mocks__/ProductsMock";
import ProductsPage from "@/app/products/page";
import { render, screen } from "@testing-library/react";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(ProductsMock),
  })
) as jest.Mock;

jest.mock("../app/api/products/route", () => ({
  getAllProducts: jest.fn(),
}));

describe("Productos", () => {
  beforeEach(async () => {
    render(await ProductsPage());
    await screen.findByText("Leche");
  });

  it("Renderizado de página productos", async () => {
    const headingElement = screen.getByRole("heading", { name: /Products/i });
    expect(headingElement).toBeInTheDocument();
  });

  it("Renderizado de todos los productos", async () => {
    ProductsMock.data.forEach((product) => {
      const productName = screen.getByText(product.name);
      expect(productName).toBeInTheDocument();
    });
  });
});
