import LogicTest from "@/app/logic-test/page";
import { render, screen } from '@testing-library/react';

describe('Home', () => {
    beforeEach(async () => {
      render(await <LogicTest />);
    });
  
    it('Renderizado de Logic Test', async () => {
        const headingElement = screen.getByRole('heading', { name: /Test de lógica/i });
        expect(headingElement).toBeInTheDocument();
    });
})