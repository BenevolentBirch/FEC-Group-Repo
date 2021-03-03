/* eslint-disable */

import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import YourOutfitList from '../../../client/src/components/relatedProducts/yourOutfitList/yourOutfitList.jsx';


describe('<YourOutfitList />', () => {
  it('renders a div component', () => {
    const wrapper = shallow(<YourOutfitList parentProductID={14932}/>);
    expect(wrapper.find('#data')).not.toBeUndefined();
  });
});