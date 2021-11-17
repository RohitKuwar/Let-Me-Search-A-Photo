import * as React from "react";
import * as enzyme from "enzyme";

import { mount, shallow } from "enzyme";
import { render, screen } from "@testing-library/react";

import Adapter from "enzyme-adapter-react-16";
import App from "./App";
import Gallery from "./components/gallery";
import SearchBox from "./components/searchBox";

enzyme.configure({ adapter: new Adapter() });

test("should render page header", () => {
  render(<App />);
  const linkElement = screen.getByText(/Photo Search App/i);
  expect(linkElement).toBeInTheDocument();
});

test("should contain searchbox component", () => {
  const container = shallow(<SearchBox />);
  expect(container.html()).toMatchSnapshot();
});

test("should contain gallery component", () => {
  const props = { images: [] };
  const container = shallow(<Gallery {...props} />);
  expect(container.html()).toMatchSnapshot();
});
