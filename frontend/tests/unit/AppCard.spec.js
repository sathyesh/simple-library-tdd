import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import AppHeader from '@/components/AppHeader.vue';

describe('AppHeader.vue', () => {
  let component;

  beforeEach(() => {
    component = shallowMount(AppHeader);
  });

  it('Renders title properly when the title is passed as prop', async () => {
    const newTitle = 'New Title';
    await component.setProps({ title: newTitle });
    expect(component.text()).to.include(newTitle);
  });
});
