import { Component } from "./Component";
import { Specification } from "./Specification";

export interface Product extends Component {
	keySpecifications: Specification[];
}
