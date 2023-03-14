export default {
  vxe: {
    loading: {
      text: 'Cargando...'
    },
    error: {
      groupFixed: 'Si se utilizan encabezados de grupo, las columnas fijas deben ser establecidas por grupo.',
      groupMouseRange: 'Los encabezados de agrupación y "{0}" no pueden ser utilizados al mismo tiempo, lo que puede causar errores.',
      groupTag: 'El encabezado de columna de agrupación debería utilizar "{0}" en lugar de "{1}", lo que puede causar errores.',
      scrollErrProp: 'El parámetro "{0}" no es compatible cuando el desplazamiento virtual está habilitado.',
      errConflicts: 'El argumento "{0}" entra en conflicto con "{1}"',
      unableInsert: 'No se puede insertar en la ubicación especificada.',
      useErr: 'Error al instalar el módulo "{0}", posiblemente en el orden equivocado, los módulos dependientes deben ser instalados antes de la tabla.',
      barUnableLink: 'La barra de herramientas no puede asociarse con la tabla.',
      expandContent: 'La ranura de fila expandible debería ser "contenido", por favor revise si está correcta.',
      reqModule: 'Requerir el módulo "{0}".',
      reqProp: 'Falta el parámetro necesario "{0}", lo que puede causar errores.',
      emptyProp: 'La propiedad "{0}" no se permite estar vacía.',
      errProp: 'Parámetro no compatible "{0}", posiblemente "{1}".',
      colRepet: 'columna.{0}="{0}" está duplicado, lo que puede hacer que algunas funciones sean inutilizables',
      notFunc: 'El método "{0}" no existe.',
      notSlot: 'La ranura "{0}" no existe.',
      noTree: 'La estructura de árbol no soporta "{0}".',
      notProp: 'Parámetros no compatibles "{0}"',
      checkProp: 'La casilla de verificación puede detenerse cuando la cantidad de datos es demasiado grande, se recomienda establecer el parámetro "{0}" para aumentar la velocidad de representación',
      coverProp: 'El parámetro "{1}" a "{0}" está sobrescrito. Esto puede causar un error',
      delFunc: 'La función "{0}" está en desuso, por favor use "{1}".',
      delProp: 'La propiedad "{0}" está en desuso, por favor use "{1}".',
      delEvent: 'El evento "{0}" está en desuso, por favor use "{1}"',
      removeProp: 'La propiedad "{0}" está en desuso y no se recomienda, lo que puede causar un error.',
      errFormat: 'El contenido formateado global debería ser definido con "VXETable.formats". No se recomienda montar "formatter={0}".',
      notType: 'Tipos de archivo no compatibles "{0}"',
      notExp: 'El navegador no es compatible con la importación / exportación.',
      impFields: 'Error de importación, por favor revise que el nombre del campo y el formato de datos sean correctos.',
      treeNotImp: 'La tabla de árbol no soporta importación.'
    },
    renderer: {
      search: 'Buscar',
      cases: {
        equal: 'Igual',
        unequal: 'Distinto que',
        gt: 'Mayor que',
        ge: 'Mayor o igual que',
        lt: 'Menor que',
        le: 'Menor o igual que',
        begin: 'Empieza por',
        notbegin: 'No empieza por',
        endin: 'Termina con',
        notendin: 'No termina con',
        include: 'Incluye',
        exclude: 'Excluye',
        between: 'Entre',
        custom: 'Filtro personalizado',
        insensitive: 'No sensible a mayúsculas/minúsculas',
        isSensitive: 'Sensible a mayúsculas/minúsculas'
      },
      combination: {
        menus: {
          clearSort: 'Limpiar ordenamiento',
          sortAsc: 'Orden ascendente',
          sortDesc: 'Orden descendente',
          fixedColumn: 'Columna fija',
          fixedGroup: 'Grupo fijo',
          cancelFixed: 'Borrar fijado',
          fixedLeft: 'Fijar a la izquierda',
          fixedRight: 'Fijar a la derecha',
          clearFilter: 'Limpiar filtro',
          textOption: 'Filtro de texto',
          numberOption: 'Filtro de número'
        },
        popup: {
          title: 'Filtro personalizado',
          currColumnTitle: 'Columna actual:',
          and: 'Y',
          or: 'O',
          describeHtml: 'Use ? para representar un solo carácter <br/> use * para representar cualquier número de caracteres'
        },
        empty: '(Vacío)',
        notData: 'No hay datos'
      }
    },
    pro: {
      area: {
        mergeErr: 'La operación no se puede realizar en celdas combinadas',
        multiErr: 'La operación no se puede realizar en áreas de selección múltiple',
        extendErr: 'Si el área extendida contiene celdas combinadas, todas las celdas combinadas deben tener el mismo tamaño',
        pasteMultiErr: 'No se puede pegar, se requieren áreas copiadas y pegadas del mismo tamaño para realizar esta operación'
      },
      fnr: {
        title: 'Buscar y reemplazar',
        findLabel: 'Buscar',
        replaceLabel: 'Reemplazar',
        findTitle: 'Qué buscar:',
        replaceTitle: 'Reemplazar con:',
        tabs: {
          find: 'Buscar',
          replace: 'Reemplazar'
        },
        filter: {
          re: 'Expresión regular',
          whole: 'Palabra completa',
          sensitive: 'Distinguir mayúsculas y minúsculas'
        },
        btns: {
          findNext: 'Buscar siguiente',
          findAll: 'Buscar todo',
          replace: 'Reemplazar',
          replaceAll: 'Reemplazar todo',
          cancel: 'Cancelar'
        },
        header: {
          seq: '#',
          cell: 'Celda',
          value: 'Valor'
        },
        empty: '(Vacío)',
        reError: 'Expresión regular inválida',
        recordCount: 'Se encontraron {0} celdas',
        notCell: 'No se encontraron celdas coincidentes',
        replaceSuccess: 'Se reemplazaron {0} celdas con éxito'
      }
    },
    table: {
      emptyText: 'No hay datos',
      allTitle: 'Seleccionar todo / cancelar',
      seqTitle: '#',
      confirmFilter: 'Confirmar',
      resetFilter: 'Restablecer',
      allFilter: 'Todo',
      sortAsc: 'Ascendente: de menor a mayor',
      sortDesc: 'Descendente: de mayor a menor',
      filter: 'Habilitar filtro en columnas seleccionadas',
      impSuccess: 'Se importaron {0} registros con éxito',
      expLoading: 'Exportando',
      expSuccess: 'Éxito al exportar',
      expFilename: 'Exportar_{0}',
      expOriginFilename: 'Exportar_original_{0}',
      customTitle: 'Configuraciones de columna',
      customAll: 'Todo',
      customConfirm: 'Confirmar',
      customRestore: 'Restaurar'
    },
    grid: {
      selectOneRecord: '¡Seleccione al menos un registro!',
      deleteSelectRecord: '¿Seguro que desea eliminar el registro seleccionado?',
      removeSelectRecord: '¿Seguro que desea quitar el registro seleccionado?',
      dataUnchanged: '¡Datos sin cambios!',
      delSuccess: '¡Se eliminó con éxito el registro seleccionado!',
      saveSuccess: '¡Guardado con éxito!',
      operError: 'Se produjo un error, ¡operación fallida!'
    },
    select: {
      search: 'Buscar',
      loadingText: 'Cargando',
      emptyText: 'No hay datos'
    },
    pager: {
      goto: 'Ir a',
      pagesize: '{0}/página',
      total: 'Total {0} registro',
      pageClassifier: '',
      prevPage: 'Página anterior',
      nextPage: 'Siguiente página',
      prevJump: 'Saltar página anterior',
      nextJump: 'Saltar siguiente página'
    },
    alert: {
      title: 'Notificación de mensaje'
    },
    button: {
      confirm: 'Confirmar',
      cancel: 'Cancelar'
    },
    import: {
      modes: {
        covering: 'Cubriendo',
        insert: 'Insertar'
      },
      impTitle: 'Importar datos',
      impFile: 'Nombre del archivo',
      impSelect: 'Seleccionar archivo',
      impType: 'Tipo de archivo',
      impOpts: 'Configuración',
      impConfirm: 'Importar',
      impCancel: 'Cancelar'
    },
    export: {
      types: {
        csv: 'CSV (Separado por comas) (.csv)',
        html: 'Página web (.html)',
        xml: 'Datos XML (.xml)',
        txt: 'Texto (Separado por tabulaciones) (.txt)',
        xls: 'Libro de Excel 97-2003 (.xls)',
        xlsx: 'Libro de Excel (.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        current: 'Datos actuales (datos de la página actual)',
        selected: 'Datos seleccionados (datos seleccionados en la página actual)',
        all: 'Todos los datos (incluidos todos los datos de paginación)'
      },
      printTitle: 'Imprimir datos',
      expTitle: 'Exportar datos',
      expName: 'Nombre del archivo',
      expNamePlaceholder: 'Por favor, introduzca un nombre de archivo',
      expSheetName: 'Título',
      expSheetNamePlaceholder: 'Por favor, introduzca un título',
      expType: 'Guardar el tipo',
      expMode: 'Seleccionar datos',
      expCurrentColumn: 'Todos los campos',
      expColumn: 'Seleccionar campos',
      expOpts: 'Configuración',
      expOptHeader: 'Encabezado',
      expHeaderTitle: '¿Necesita un encabezado?',
      expOptFooter: 'Pie de página',
      expFooterTitle: '¿Necesita el pie de página de la tabla?',
      expOptColgroup: 'Encabezado de grupo',
      expColgroupTitle: 'Si existe, se admiten encabezados con estructura de agrupación',
      expOptMerge: 'Combinar',
      expMergeTitle: 'Si existe, se admiten celdas con estructuras combinadas',
      expOptAllExpand: 'Expandir nodos',
      expAllExpandTitle: 'Si existe, se pueden expandir todos los datos con estructura de árbol',
      expOptUseStyle: 'Estilos',
      expUseStyleTitle: 'Si existe, se admiten celdas con estilos',
      expOptOriginal: 'Datos de origen',
      expOriginalTitle: 'Si son datos de origen, se admite la importación en la tabla',
      expPrint: 'Imprimir',
      expConfirm: 'Exportar',
      expCancel: 'Cancelar'
    },
    modal: {
      zoomIn: 'Maximizar',
      zoomOut: 'Reducir',
      close: 'Cerrar'
    },
    form: {
      folding: 'Plegar',
      unfolding: 'Desplegar'
    },
    toolbar: {
      importar: 'Importar',
      exportar: 'Exportar',
      imprimir: 'Imprimir',
      actualizar: 'Actualizar',
      zoomIn: 'Pantalla completa',
      zoomOut: 'Reducción',
      personalizado: 'Configuración de columna',
      personalizadoTodo: 'Todo',
      personalizadoConfirmar: 'Confirmar',
      personalizadoRestaurar: 'Restaurar'
    },
    entrada: {
      fecha: {
        m1: 'Enero',
        m2: 'Febrero',
        m3: 'Marzo',
        m4: 'Abril',
        m5: 'Mayo',
        m6: 'Junio',
        m7: 'Julio',
        m8: 'Agosto',
        m9: 'Septiembre',
        m10: 'Octubre',
        m11: 'Noviembre',
        m12: 'Diciembre',
        quarterLabel: '{0}',
        monthLabel: '{0}',
        dayLabel: '{1} {0}',
        labelFormat: {
          date: 'dd/MM/yyyy',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: '[Semana] WW, yyyy',
          month: 'MM/yyyy',
          quarter: '[Trimestre] q, yyyy',
          year: 'yyyy'
        },
        weeks: {
          w: 'Semana',
          w0: 'Dom',
          w1: 'Lun',
          w2: 'Mar',
          w3: 'Mié',
          w4: 'Jue',
          w5: 'Vie',
          w6: 'Sáb'
        },
        months: {
          m0: 'Ene',
          m1: 'Feb',
          m2: 'Mar',
          m3: 'Abr',
          m4: 'May',
          m5: 'Jun',
          m6: 'Jul',
          m7: 'Ago',
          m8: 'Sep',
          m9: 'Oct',
          m10: 'Nov',
          m11: 'Dic'
        },
        quarters: {
          q1: 'Primer trimestre',
          q2: 'Segundo trimestre',
          q3: 'Tercer trimestre',
          q4: 'Cuarto trimestre'
        }
      }
    }
  }
}
