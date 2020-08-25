import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import AppList from '@/components/AppList.vue';

describe('AppList.vue', () => {
  let component;

  beforeEach(() => {
    component = shallowMount(AppList);
  });

  it('Renders errorMsg when the listitems is empty', async () => {
    const errorMsg = 'List is empty';
    await component.setProps({ listItems: [], errorMsg });
    expect(component.text()).to.include(errorMsg);
  });

  it('Renders list when the list contains data', async () => {
    const tempListItems = [{
      isbn: 'ISBN0001',
      title: 'Book1',
      available_copies: 1,
    },
    ];
    await component.setProps({ listItems: tempListItems });
    expect(component.find('li').exists()).to.be.true;
  });
});
