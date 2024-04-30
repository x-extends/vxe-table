export default {
  vxe: {
    base: {
      pleaseInput: 'Please input',
      pleaseSelect: 'Select'
    },
    loading: {
      text: 'Cargando...'
    },
    error: {
      groupFixed: 'If you use group headers, the freeze columns must be set by group.',
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
      errFunc: 'The argument "{0}" is not a method',
      notValidators: 'Global validators "{0}" no existe.',
      notFormats: 'Global formats "{0}" no existe.',
      notCommands: 'Global commands "{0}" no existe.',
      notSlot: 'La ranura "{0}" no existe.',
      noTree: 'La estructura de árbol no soporta "{0}".',
      notProp: 'Parámetros no compatibles "{0}"',
      checkProp: 'La casilla de verificación puede detenerse cuando la cantidad de datos es demasiado grande, se recomienda establecer el parámetro "{0}" para aumentar la velocidad de representación',
      coverProp: 'The parameter "{1}" to "{0}" is repeatedly defined. This may cause an error',
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
      customRestore: 'Restaurar',
      maxFixedCol: 'The maximum number of Freeze columns cannot exceed {0}'
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
      homePage: 'Home',
      homePageTitle: 'Home page',
      prevPage: 'Página anterior',
      prevPageTitle: 'Previous page',
      nextPage: 'Siguiente página',
      nextPageTitle: 'next page',
      prevJump: 'Saltar página anterior',
      prevJumpTitle: 'Jump previous page',
      nextJump: 'Saltar siguiente página',
      nextJumpTitle: 'Jump next page',
      endPage: 'End page',
      endPageTitle: 'End'
    },
    alert: {
      title: 'System messages'
    },
    button: {
      confirm: 'Confirmar',
      cancel: 'Cancelar'
    },
    filter: {
      search: '搜索'
    },
    custom: {
      cstmTitle: 'Column Settings',
      cstmRestore: 'Restore default',
      cstmCancel: 'Cancelar',
      cstmConfirm: 'Confirm',
      cstmConfirmRestore: 'Please confirm whether to restore the default column configuration?',
      cstmDragTarget: 'Moving target: {0}',
      setting: {
        colSort: 'Sort',
        sortHelpTip: 'Click and drag the icon to adjust the order of the columns.',
        colTitle: 'Title',
        colVisible: 'Visible',
        colFixed: 'Freeze columns (Max {0})',
        fixedLeft: 'Left',
        fixedUnset: 'Unset',
        fixedRight: 'Right'
      }
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
      custom: 'Configuración de columna',
      customAll: 'Todo',
      customConfirm: 'Confirmar',
      customRestore: 'Restaurar',
      fixedLeft: 'Freeze on the left',
      fixedRight: 'Freeze on the right',
      cancelfixed: 'Unfreeze column'
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
    },

    /**
     * 扩展插件
     */
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: '无法对合并单元格进行该操作',
          multiErr: '无法对多重选择区域进行该操作',
          extendErr: '如果延伸的区域包含被合并的单元格，所有合并的单元格需大小相同',
          pasteMultiErr: '无法粘贴，需要相同大小的复制的区域和粘贴的区域才能执行此操作',
          cpInvalidErr: '该操作无法进行，您选择的区域中存在被禁止的列（{0}）'
        },
        fnr: {
          title: '查找和替换',
          findLabel: '查找',
          replaceLabel: '替换',
          findTitle: '查找内容：',
          replaceTitle: '替换为：',
          tabs: {
            find: '查找',
            replace: '替换'
          },
          filter: {
            re: '正则表达式',
            whole: '全词匹配',
            sensitive: '区分大小写'
          },
          btns: {
            findNext: '查找下一个',
            findAll: '查找全部',
            replace: '替换',
            replaceAll: '替换全部',
            cancel: '取消'
          },
          header: {
            seq: '#',
            cell: '单元格',
            value: '值'
          },
          empty: '(空值)',
          reError: '无效的正则表达式',
          recordCount: '已找到 {0} 个单元格',
          notCell: '找不到匹配的单元格',
          replaceSuccess: '成功替换 {0} 个单元格'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: '锁定列',
          fixedGroup: '锁定组',
          cancelFixed: '取消锁定',
          fixedLeft: '锁定左侧',
          fixedRight: '锁定右侧'
        },
        cases: {
          equal: '等于',
          gt: '大于',
          lt: '小于',
          begin: '开头是',
          endin: '结尾是',
          include: '包含',
          isSensitive: '区分大小写'
        }
      },
      filterCombination: {
        menus: {
          clearSort: '清除排序',
          sortAsc: '升序',
          sortDesc: '降序',
          fixedColumn: '锁定列',
          fixedGroup: '锁定组',
          cancelFixed: '取消锁定',
          fixedLeft: '锁定左侧',
          fixedRight: '锁定右侧',
          clearFilter: '清除筛选',
          textOption: '文本筛选',
          numberOption: '数值筛选'
        },
        popup: {
          title: '自定义筛选的方式',
          currColumnTitle: '当前列：',
          and: '与',
          or: '或',
          describeHtml: '可用 ? 代表单个字符<br/>用 * 代表任意多个字符'
        },
        cases: {
          equal: '等于',
          unequal: '不等于',
          gt: '大于',
          ge: '大于或等于',
          lt: '小于',
          le: '小于或等于',
          begin: '开头是',
          notbegin: '开头不是',
          endin: '结尾是',
          notendin: '结尾不是',
          include: '包含',
          exclude: '不包含',
          between: '介于',
          custom: '自定义筛选',
          insensitive: '不区分大小写',
          isSensitive: '区分大小写'
        },
        empty: '(空白)',
        notData: '无匹配项'
      }
    },

    /**
     * 以下废弃
     * @deprecated
     */
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
    }
  }
}
