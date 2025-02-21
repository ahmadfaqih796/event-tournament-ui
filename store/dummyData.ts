export const items = ref(Array.from({ length: 100 }, (_, index) => ({
   id: index + 1,
   name: `User ${index + 1}`,
   email: `user${index + 1}@example.com`,
   age: 20 + index,
   status: index % 2 === 0 ? 'Active' : 'Inactive',
   address: `Street ${index + 1}, City, Country`,
})));

export const columns = [
  { title: 'ID', field: 'id', sortable: true, width: 50 },
  { title: 'Name', field: 'name', sortable: true, width: 150 },
  { title: 'Email', field: 'email' },
  { title: 'Age', field: 'age' },
  { title: 'Status', field: 'status' },
  { title: 'Address', field: 'address', width: 200 },
  { 
    title: 'Data', 
    field: 'data', 
    formatter: (rowData: any) => `
      <div>
        <p>Data here</p>
        <p>${rowData.name}</p>
        <p>${rowData.age}</p>
        <p>${rowData.status}</p>
      </div>
    `
  },
  { 
    title: 'Actions', 
    field: 'actions', 
    actions: (rowData: any, index: number) => [
      // { label: 'Edit', color: 'primary', icon: 'mdi-pencil', onClick: () => {openModal()} },
      { label: 'Delete', color: 'error', icon: 'mdi-delete', onClick: () => {} }
    ]
  }
];