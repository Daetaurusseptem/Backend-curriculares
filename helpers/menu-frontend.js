exports.getMenuFrontEnd =(role='admin')=>{
  const menu =
  [
    {
      title:'',
      icon: 'mdi mdi-gauge',
      submenu: [
      ]
    }
  ];


  
  if(role==='admin'){
    menu[0].title='admin'
    menu[0].submenu.unshift(
      {title:'Alumnos', url:'alumnos'},
      {title:'Maestros', url:'maestros'},
      {title:'Materias', url:'materias'},
      {title:'Eventos', url:'eventos'},
      {title:'Crear Maestro', url:'crear-maestro'},
      {title:'Crear Materia', url:'materias/crear-materia'},
      {title:'Crear Evento', url:'crear-evento'},
    );
  }
  
  if(role==='maestro'){
    
    menu[0].title='Herramientas Maestro'
    menu[0].submenu.unshift(
      {title:'Alumnos', url:'alumnos'},
      {title:'Maestros', url:'maestros'},
      {title:'Materias', url:'materias'},
      {title:'Eventos', url:'eventos'},
      {title:'Crear Maestro', url:'crear-maestro'},
      {title:'Crear Materia', url:'materias/crear-materia'},
      {title:'Crear Evento', url:'crear-evento'},
      );
  }
  
  if(role==='alumno'){
    menu[0].title='alumno'
    
    menu[0].submenu.unshift({title: 'alumno', url: 'alumno' });
  }
  
  return menu
}