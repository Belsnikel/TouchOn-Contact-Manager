import { mount } from '@vue/test-utils';
import ContactItem from '@/components/ContactItem.vue';
import axios from 'axios';

// Mock axios
jest.mock('axios');

describe('ContactItem.vue', () => {
  const props = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+123 (456) 789-01-23',
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(ContactItem, {
      props,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('отображает данные контакта', () => {
    expect(wrapper.text()).toContain(props.name);
    expect(wrapper.text()).toContain(props.email);
    expect(wrapper.text()).toContain(props.phone);
  });

  it('отправляет событие и вызывает API при удалении контакта', async () => {
    const deleteButton = wrapper.find('.delete-btn');
    (axios.delete as jest.Mock).mockResolvedValue({});

    await deleteButton.trigger('click');

    expect(axios.delete).toHaveBeenCalledWith(`https://3cb670945d3e6179.mokky.dev/contacts/${props.id}`);
    expect(wrapper.emitted()).toHaveProperty('updateContactList');
  });

  it('открывает модальное окно для редактирования контакта', async () => {
    const editButton = wrapper.find('.edit-btn');

    await editButton.trigger('click');

    expect(wrapper.find('.modal').exists()).toBe(true);
  });

  it('отправляет обновленные данные контакта и вызывает API при сохранении', async () => {
    const editButton = wrapper.find('.edit-btn');
    await editButton.trigger('click');

    // Находим и обновляем поля формы
    const nameInput = wrapper.find('input[placeholder="Name"]');
    const phoneInput = wrapper.find('input[placeholder="Phone"]');
    const emailInput = wrapper.find('input[placeholder="Email"]');

    await nameInput.setValue('Jane Doe');
    await phoneInput.setValue('+987 (654) 321-09-87');
    await emailInput.setValue('jane@example.com');

    // Мокаем patch запрос
    (axios.patch as jest.Mock).mockResolvedValue({});

    // Отправляем форму
    const saveButton = wrapper.find('.save-btn');
    await saveButton.trigger('click');

    expect(axios.patch).toHaveBeenCalledWith(`https://3cb670945d3e6179.mokky.dev/contacts/${props.id}`, {
      name: 'Jane Doe',
      phone: '+987 (654) 321-09-87',
      email: 'jane@example.com',
    });

    expect(wrapper.emitted()).toHaveProperty('updateContactList');
  });
});