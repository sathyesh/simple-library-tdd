import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import AppButton from '@/components/AppButton.vue';

describe('AppButton.vue', () => {
  let component;

  beforeEach(() => {
    component = shallowMount(AppButton);
  });

  it('Renders value properly when the value is passed as prop', async () => {
    const newValue = 'New Value';
    await component.setProps({ value: newValue });
    expect(component.text()).to.include(newValue);
  });
});
