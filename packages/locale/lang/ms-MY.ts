export default {
  vxe: {
    base: {
      pleaseInput: 'Sila masukkan',
      pleaseSelect: 'Sila pilih',
      comma: '，',
      fullStop: '。'
    },
    loading: {
      text: 'Memuatkan ...'
    },
    error: {
      downErr: 'Muat turun gagal',
      errLargeData: 'Apabila jumlah data terikat terlalu besar, sila gunakan {0}, jika tidak, ia boleh menyebabkan ketinggalan',
      groupFixed: 'Sekiranya menggunakan tajuk dikumpulkan, lajur beku mesti ditetapkan oleh kumpulan',
      groupMouseRange: 'Tajuk kumpulan tidak boleh digunakan pada masa yang sama seperti "{0}" dan ini boleh menyebabkan ralat',
      groupTag: 'Mengumpulkan tajuk lajur harus menggunakan "{0}" bukannya "{1}", yang boleh menyebabkan kesilapan',
      scrollErrProp: 'Parameter ini "{0}" tidak disokong selepas menatal maya diaktifkan',
      errConflicts: 'Parameter "{0}" Konflik dengan "{1}"',
      notSupportProp: '"{1}" tidak disokong apabila parameter "{0}" diaktifkan, ia harus "{2}", jika tidak, ralat akan berlaku',
      notConflictProp: 'Apabila menggunakan "{0}", "{1}" harus ditetapkan, jika tidak ada konflik fungsional',
      unableInsert: 'Tidak dapat dimasukkan ke lokasi yang ditentukan, sila periksa sama ada parameternya betul',
      useErr: 'Ralat berlaku semasa memasang modul "{0}". Perintah itu mungkin tidak betul. Modul bergantung perlu dipasang sebelum jadual',
      barUnableLink: 'Bar alat tidak dapat mengaitkan jadual',
      expandContent: 'Slot untuk garis yang diperluas mestilah "kandungan", sila periksa sama ada betul',
      reqComp: 'Komponen "{0}" hilang, sila periksa sama ada ia dipasang dengan betul. https://vxeui.com/#/start/useglobal',
      reqModule: 'Hilang "{0}" modul',
      reqProp: 'Parameter yang diperlukan "{0}" hilang, yang boleh menyebabkan kesilapan',
      emptyProp: 'Parameter "{0}" tidak dibenarkan kosong',
      errProp: 'Parameter yang tidak disokong "{0}", mungkin "{1}"',
      colRepet: 'lajur. {0} = "{1}" diulang, yang boleh menyebabkan beberapa fungsi menjadi tidak dapat digunakan',
      notFunc: 'Kaedah "{0}" tidak wujud',
      errFunc: 'Parameter "{0}" bukan kaedah',
      notValidators: 'Pengesahan Global "{0}" tidak wujud',
      notFormats: 'Pemformatan global "{0}" tidak wujud',
      notCommands: 'Arahan global "{0}" tidak wujud',
      notSlot: 'Slot "{0}" tidak wujud',
      noTree: '"{0}" tidak disokong dalam struktur pokok',
      notProp: 'Parameter yang tidak disokong "{0}"',
      checkProp: 'Apabila jumlah data terlalu besar, kotak semak boleh digagalkan. Adalah disyorkan untuk menetapkan parameter "{0}" untuk meningkatkan kelajuan rendering',
      coverProp: 'Parameter "{1}" dari "{0}" ditakrifkan berulang kali, yang boleh menyebabkan ralat',
      uniField: 'Nama medan "{0}" ditakrifkan berulang kali, yang boleh menyebabkan ralat',
      repeatKey: 'Ulangi kunci utama {0} = "{1}", yang boleh menyebabkan ralat',
      delFunc: 'Kaedah "{0}" ditolak, sila gunakan "{1}"',
      delProp: 'Parameter "{0}" ditolak, sila gunakan "{1}"',
      delEvent: 'Acara "{0}" ditolak, sila gunakan "{1}"',
      removeProp: 'Parameter "{0}" ditutup dan tidak disyorkan, yang boleh menyebabkan ralat',
      errFormat: 'Kandungan diformat global hendaklah ditakrifkan menggunakan "vxetable.formats" dan kaedah pemasangan "formatter = {0}" tidak lagi disyorkan.',
      notType: 'Jenis fail yang tidak disokong "{0}"',
      notExp: 'Penyemak imbas ini tidak menyokong fungsi import/eksport',
      impFields: 'Import gagal. Sila periksa sama ada nama medan dan format data betul.',
      treeNotImp: 'Meja pokok tidak menyokong import',
      treeCrossDrag: 'Hanya seret tahap pertama',
      treeDragChild: 'Ibu bapa tidak boleh menyeret anak mereka sendiri',
      reqPlugin: '"{1}" tidak dipasang di https://vxeui.com/other (0 )/#/ = (1 )/Install',
      errMaxRow: 'Melebihi baris data yang disokong maksimum {0} baris, ini boleh menyebabkan ralat'
    },
    table: {
      emptyText: 'Belum ada data',
      allTitle: 'Pilih Semua/Batal',
      seqTitle: 'Nombor siri',
      actionTitle: 'mengendalikan',
      confirmFilter: 'penapis',
      resetFilter: 'Tetapkan semula',
      allFilter: 'semua',
      sortAsc: 'Perintah menaik: terendah hingga tertinggi',
      sortDesc: 'Perintah menurun: tertinggi hingga terendah',
      filter: 'Dayakan penapisan untuk lajur yang dipilih',
      impSuccess: '{0} Rekod berjaya diimport',
      expLoading: 'Mengeksport',
      expSuccess: 'Berjaya mengeksport',
      expError: 'Eksport gagal',
      expFilename: 'Export_ {0}',
      expOriginFilename: 'Export_source_ {0}',
      customTitle: 'Tetapan lajur',
      customAll: 'semua',
      customConfirm: 'mengesahkan',
      customClose: 'penutupan',
      customCancel: 'Batalkan',
      customRestore: 'Pulihkan lalai',
      maxFixedCol: 'Bilangan lajur beku maksimum tidak dapat melebihi {0}',
      dragTip: 'Bergerak: {0}',
      resizeColTip: 'Lebar: {0} piksel',
      resizeRowTip: 'Tinggi: {0} piksel',
      rowGroupContentTotal: '{0}（{1}）'
    },
    grid: {
      selectOneRecord: 'Sila pilih sekurang -kurangnya satu rekod!',
      deleteSelectRecord: 'Adakah anda pasti mahu memadamkan rekod yang dipilih?',
      removeSelectRecord: 'Adakah anda pasti mahu mengeluarkan rekod yang dipilih?',
      dataUnchanged: 'Data tidak berubah!',
      delSuccess: 'Rekod yang dipilih berjaya dipadam!',
      saveSuccess: 'Jimat dengan jayanya!',
      operError: 'Kesalahan berlaku dan operasi gagal!'
    },
    select: {
      search: 'cari',
      loadingText: 'Memuatkan',
      emptyText: 'Belum ada data'
    },
    pager: {
      goto: 'Pergi',
      gotoTitle: 'Bilangan halaman',
      pagesize: '{0} item/halaman',
      total: 'Jumlah {0} rekod',
      pageClassifier: 'Halaman',
      homePage: 'Halaman depan',
      homePageTitle: 'Halaman depan',
      prevPage: 'Halaman sebelumnya',
      prevPageTitle: 'Halaman sebelumnya',
      nextPage: 'Halaman seterusnya',
      nextPageTitle: 'Halaman seterusnya',
      prevJump: 'Lompat halaman',
      prevJumpTitle: 'Lompat halaman',
      nextJump: 'Lompat ke bawah',
      nextJumpTitle: 'Lompat ke bawah',
      endPage: 'Halaman terakhir',
      endPageTitle: 'Halaman terakhir'
    },
    alert: {
      title: 'Sistem meminta'
    },
    button: {
      confirm: 'mengesahkan',
      cancel: 'Batalkan',
      clear: 'Jelas'
    },
    filter: {
      search: 'cari'
    },
    custom: {
      cstmTitle: 'Tetapan lajur',
      cstmRestore: 'Pulihkan lalai',
      cstmCancel: 'Batalkan',
      cstmConfirm: 'Pasti',
      cstmConfirmRestore: 'Sila sahkan sama ada ia dipulihkan ke konfigurasi lajur lalai?',
      cstmDragTarget: 'Bergerak: {0}',
      setting: {
        colSort: 'Menyusun',
        sortHelpTip: 'Klik dan seret ikon untuk menyesuaikan jenis lajur',
        colTitle: 'Tajuk lajur',
        colResizable: 'Lebar lajur (piksel)',
        colVisible: 'Sama ada untuk memaparkan',
        colFixed: 'Lajur membekukan',
        colFixedMax: 'Lajur beku (sehingga {0} lajur)',
        fixedLeft: 'Sebelah kiri',
        fixedUnset: 'Tidak ditetapkan',
        fixedRight: 'Sebelah kanan'
      }
    },
    import: {
      modes: {
        covering: 'Kaedah Overwrite (secara langsung menimpa data jadual)',
        insert: 'Tambah di bahagian bawah (tambah data baru di bahagian bawah jadual)',
        insertTop: 'Tambah di bahagian atas (tambah data baru di bahagian atas jadual)',
        insertBottom: 'Tambah di bahagian bawah (tambah data baru di bahagian bawah jadual)'
      },
      impTitle: 'Import data',
      impFile: 'nama fail',
      impSelect: 'Pilih fail',
      impType: 'Jenis fail',
      impOpts: 'Tetapan parameter',
      impMode: 'Mod import',
      impConfirm: 'Import',
      impCancel: 'Batalkan'
    },
    export: {
      types: {
        csv: 'CSV (dipisahkan koma) (*. CSV)',
        html: 'Laman web (*.html)',
        xml: 'Data XML (*.xml)',
        txt: 'Fail Teks (Tab-dipisahkan) (*. TXT)',
        xls: 'Buku Kerja Excel 97-2003 (*.xls)',
        xlsx: 'Buku Kerja Excel (*.xlsx)',
        pdf: 'Pdf (*.pdf)'
      },
      modes: {
        empty: 'Data kosong',
        current: 'Data semasa (data pada halaman semasa)',
        selected: 'Data terpilih (data yang dipilih pada halaman semasa)',
        all: 'Data penuh (termasuk semua data paged)'
      },
      printTitle: 'Cetak data',
      expTitle: 'Data eksport',
      expName: 'nama fail',
      expNamePlaceholder: 'Sila masukkan nama fail',
      expSheetName: 'tajuk',
      expSheetNamePlaceholder: 'Sila masukkan tajuk',
      expType: 'Simpan jenis',
      expMode: 'Pilih data',
      expCurrentColumn: 'Semua bidang',
      expColumn: 'Pilih medan',
      expOpts: 'Tetapan parameter',
      expOptHeader: 'Header',
      expHeaderTitle: 'Adakah tajuk meja diperlukan',
      expOptFooter: 'Akhir jadual',
      expFooterTitle: 'Adakah akhir jadual diperlukan?',
      expOptColgroup: 'Pengumpulan tajuk',
      expOptTitle: 'Tajuk lajur',
      expTitleTitle: 'Sama ada tajuk lajur, jika tidak, ia akan dipaparkan sebagai nama medan lajur',
      expColgroupTitle: 'Sekiranya hadir, tajuk dengan struktur pengelompokan disokong',
      expOptMerge: 'bergabung',
      expMergeTitle: 'Sekiranya ada, sel -sel dengan struktur yang digabungkan disokong',
      expOptAllExpand: 'Kembangkan pokok',
      expAllExpandTitle: 'Sekiranya wujud, ia disokong untuk mengembangkan semua data dengan struktur hierarki',
      expOptUseStyle: 'gaya',
      expUseStyleTitle: 'Sekiranya ada, sel dengan gaya disokong',
      expOptOriginal: 'Data sumber',
      expOriginalTitle: 'Sekiranya ia adalah data sumber, import ke dalam jadual disokong',
      expPrint: 'Cetak',
      expConfirm: 'Eksport',
      expCancel: 'Batalkan'
    },
    modal: {
      errTitle: 'Mesej ralat',
      zoomMin: 'Meminimumkan',
      zoomIn: 'memaksimumkan',
      zoomOut: 'pengurangan',
      close: 'penutupan',
      miniMaxSize: 'Bilangan tingkap yang diminimumkan tidak dapat melebihi {0}',
      footPropErr: 'Show-footer hanya digunakan untuk membolehkan ekor meja, dan mesti digunakan dengan butang-butang yang disiarkan | Show-Cancel-button | slot'
    },
    drawer: {
      close: 'penutupan'
    },
    form: {
      folding: 'Tutup',
      unfolding: 'Berkembang'
    },
    toolbar: {
      import: 'Import',
      export: 'Eksport',
      print: 'Cetak',
      refresh: 'menyegarkan',
      zoomIn: 'skrin penuh',
      zoomOut: 'pengurangan',
      custom: 'Tetapan lajur',
      customAll: 'semua',
      customConfirm: 'mengesahkan',
      customRestore: 'Tetapkan semula',
      fixedLeft: 'Membekukan di sebelah kiri',
      fixedRight: 'Membekukan di sebelah kanan',
      cancelFixed: 'Lajur yang tidak jelas'
    },
    datePicker: {
      yearTitle: '{0} tahun'
    },
    dateRangePicker: {
      pleaseRange: '请选择开始日期与结束日期'
    },
    input: {
      date: {
        m1: '01 bulan',
        m2: '02 bulan',
        m3: '03 bulan',
        m4: '04 bulan',
        m5: '05 bulan',
        m6: '06 bulan',
        m7: '07 bulan',
        m8: '08 bulan',
        m9: '09 bulan',
        m10: 'Oktober',
        m11: 'November',
        m12: 'Disember',
        quarterLabel: '{0} tahun',
        monthLabel: '{0} tahun',
        dayLabel: '{0} tahun {1}',
        labelFormat: {
          date: 'yyyy-MM-dd',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: 'Week WW of year yyyy',
          month: 'yyyy-MM',
          quarter: 'quarter q of year yyyy',
          year: 'yyyy'
        },
        weeks: {
          w: '',
          w0: 'Ahad',
          w1: 'pada hari Isnin',
          w2: 'Selasa',
          w3: 'Rabu',
          w4: 'Khamis',
          w5: 'Jumaat',
          w6: 'Sabtu'
        },
        months: {
          m0: 'Januari',
          m1: 'Februari',
          m2: 'Mac',
          m3: 'April',
          m4: 'Mei',
          m5: 'Jun',
          m6: 'Julai',
          m7: 'Ogos',
          m8: 'September',
          m9: 'Oktober',
          m10: 'November',
          m11: 'Disember'
        },
        quarters: {
          q1: 'Q1',
          q2: 'Q2',
          q3: 'Q3',
          q4: 'Q4'
        }
      }
    },
    numberInput: {
      currencySymbol: '$'
    },
    imagePreview: {
      popupTitle: 'Pratonton',
      operBtn: {
        zoomOut: 'Mengecut',
        zoomIn: 'membesar',
        pctFull: 'Skala sama',
        pct11: 'Tunjukkan saiz asal',
        rotateLeft: 'Putar kiri',
        rotateRight: 'Berputar ke kanan',
        print: 'Klik untuk mencetak gambar',
        download: 'Klik untuk memuat turun gambar'
      }
    },
    upload: {
      fileBtnText: 'Klik atau seret untuk memuat naik',
      imgBtnText: 'Klik atau seret untuk memuat naik',
      dragPlaceholder: 'Sila seret dan jatuhkan fail ke kawasan ini untuk dimuat naik',
      imgSizeHint: 'Single {0}',
      imgCountHint: 'Hingga {0}',
      fileTypeHint: 'Sokongan {0} Jenis Fail',
      fileSizeHint: 'Saiz fail tunggal tidak melebihi {0}',
      fileCountHint: 'Hingga {0} fail boleh dimuat naik',
      uploadTypeErr: 'Jenis fail tidak sepadan!',
      overCountErr: 'Hanya {0} fail boleh dipilih paling banyak!',
      overCountExtraErr: 'Jumlah maksimum {0} telah melebihi, dan lebihan fail {1} ​​akan diabaikan!',
      overSizeErr: 'Saiz fail maksimum tidak boleh melebihi {0}!',
      reUpload: 'Muat naik semula',
      uploadProgress: 'Memuat naik {0}%',
      uploadErr: 'Muat naik gagal',
      uploadSuccess: 'Muat naik dengan jayanya',
      moreBtnText: 'Lebih ({0})',
      viewItemTitle: 'Klik untuk Lihat',
      morePopup: {
        readTitle: 'Lihat senarai',
        imageTitle: 'Memuat naik gambar',
        fileTitle: 'Muat naik fail'
      }
    },
    empty: {
      defText: 'Belum ada data'
    },
    colorPicker: {
      clear: 'Jelas',
      confirm: 'mengesahkan',
      copySuccess: 'Disalin ke papan klip: {0}'
    },
    formDesign: {
      formName: 'Nama Bentuk',
      defFormTitle: 'Bentuk yang tidak dinamakan',
      widgetPropTab: 'Sifat kawalan',
      widgetFormTab: 'Bentuk sifat',
      error: {
        wdFormUni: 'Jenis kawalan ini dibenarkan untuk menambah satu dalam bentuk',
        wdSubUni: 'Jenis kawalan ini dibenarkan untuk menambah satu di subtable'
      },
      styleSetting: {
        btn: 'Tetapan Gaya',
        title: 'Tetapan gaya bentuk',
        layoutTitle: 'Susun atur kawalan',
        verticalLayout: 'Susun atur atas dan ke bawah',
        horizontalLayout: 'Susun atur mendatar',
        styleTitle: 'Gaya tajuk',
        boldTitle: 'Tajuk tebal',
        fontBold: 'Berani',
        fontNormal: 'konvensional',
        colonTitle: 'Tunjukkan kolon',
        colonVisible: 'tunjukkan',
        colonHidden: 'Sembunyikan',
        alignTitle: 'Penjajaran',
        widthTitle: 'Lebar tajuk',
        alignLeft: 'Di sebelah kiri',
        alignRight: 'Di sebelah kanan',
        unitPx: 'Piksel',
        unitPct: 'peratusan'
      },
      widget: {
        group: {
          base: 'Kawalan asas',
          layout: 'Kawalan susun atur',
          system: 'Kawalan sistem',
          module: 'Kawalan modul',
          chart: 'Kawalan carta',
          advanced: 'Kawalan lanjutan'
        },
        copyTitle: 'Copy_ {0}',
        component: {
          input: 'Kotak input',
          textarea: 'Medan teks',
          select: 'Tarik ke bawah untuk memilih',
          row: 'Satu baris dan pelbagai lajur',
          title: 'tajuk',
          text: 'teks',
          subtable: 'Sub-meja',
          VxeSwitch: 'Sama ada',
          VxeInput: 'Kotak input',
          VxeNumberInput: 'nombor',
          VxeDatePicker: 'tarikh',
          VxeTextarea: 'Medan teks',
          VxeSelect: 'Tarik ke bawah untuk memilih',
          VxeTreeSelect: 'Pemilihan pokok',
          VxeRadioGroup: 'Kotak Radio',
          VxeCheckboxGroup: 'Kotak periksa',
          VxeUploadFile: 'dokumen',
          VxeUploadImage: 'gambar',
          VxeRate: 'skor',
          VxeSlider: 'slider'
        }
      },
      widgetProp: {
        name: 'Nama kawalan',
        placeholder: 'Segera',
        required: 'Pengesahan yang diperlukan',
        multiple: 'Pelbagai pilihan dibenarkan',
        displaySetting: {
          name: 'Tetapan paparan',
          pc: 'Komputer',
          mobile: 'Mudah alih',
          visible: 'tunjukkan',
          hidden: 'Sembunyikan'
        },
        dataSource: {
          name: 'Sumber data',
          defValue: 'Pilihan {0}',
          addOption: 'Tambah pilihan',
          batchEditOption: 'Pengeditan batch',
          batchEditTip: 'Setiap baris sepadan dengan pilihan, yang menyokong salinan langsung dan tampal dari Jadual, Excel, dan WPS.',
          batchEditSubTip: 'Setiap baris sepadan dengan pilihan. Jika ia adalah kumpulan, item kanak -kanak boleh bermula dengan ruang atau kunci tab, dan ia menyokong salinan langsung dan tampal dari Tables, Excel, dan WPS.',
          buildOption: 'Menjana pilihan'
        },
        rowProp: {
          colSize: 'Bilangan lajur',
          col2: 'Dua lajur',
          col3: 'Tiga lajur',
          col4: 'Empat lajur',
          col6: 'Enam lajur',
          layout: 'susun atur'
        },
        textProp: {
          name: 'kandungan',
          alignTitle: 'Penjajaran',
          alignLeft: 'Di sebelah kiri',
          alignCenter: 'Pusat',
          alignRight: 'Di sebelah kanan',
          colorTitle: 'Warna fon',
          sizeTitle: 'Saiz fon',
          boldTitle: 'Fon tebal',
          fontNormal: 'konvensional',
          fontBold: 'Berani'
        },
        subtableProp: {
          seqTitle: 'Nombor siri',
          showSeq: 'Tunjukkan nombor siri',
          showCheckbox: 'Pelbagai pilihan dibenarkan',
          errSubDrag: 'Subtable tidak menyokong kawalan ini, sila gunakan kawalan lain',
          colPlace: 'Seret kawalan di'
        },
        uploadProp: {
          limitFileCount: 'Had kuantiti fail',
          limitFileSize: 'Had saiz fail',
          multiFile: 'Benarkan pelbagai fail dimuat naik',
          limitImgCount: 'Hadkan bilangan gambar',
          limitImgSize: 'Had saiz imej',
          multiImg: 'Benarkan pelbagai gambar dimuat naik'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Tetapan medan',
      listSettingTab: 'Tetapan parameter',
      searchTitle: 'Kriteria pertanyaan',
      listTitle: 'Medan Senarai',
      searchField: 'Medan pertanyaan',
      listField: 'Medan Senarai',
      activeBtn: {
        ActionButtonUpdate: 'edit',
        ActionButtonDelete: 'Padam'
      },
      search: {
        addBtn: 'Edit',
        emptyText: 'Syarat pertanyaan tidak dikonfigurasikan',
        editPopupTitle: 'Edit medan pertanyaan'
      },
      searchPopup: {
        colTitle: 'tajuk',
        saveBtn: 'Simpan'
      }
    },
    text: {
      copySuccess: 'Disalin ke clipboard',
      copyError: 'Persekitaran semasa tidak menyokong operasi ini'
    },
    countdown: {
      formats: {
        yyyy: 'Tahun',
        MM: 'bulan',
        dd: 'langit',
        HH: 'jam',
        mm: 'titik',
        ss: 'Kedua'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: 'Operasi ini tidak dapat dilakukan pada sel yang digabungkan',
          multiErr: 'Operasi ini tidak dapat dilakukan di kawasan Multi-Select',
          selectErr: 'Tidak dapat mengendalikan sel di kawasan yang ditentukan',
          extendErr: 'Sekiranya kawasan lanjutan mengandungi sel yang digabungkan, semua sel yang digabungkan mestilah saiz yang sama',
          pasteMultiErr: 'Tidak dapat menampal, perlu menyalin dan menampal kawasan yang sama untuk melakukan ini',
          cpInvalidErr: 'Operasi ini tidak dapat dilakukan, terdapat lajur yang dilarang di kawasan yang anda pilih ({0})'
        },
        fnr: {
          title: 'Cari dan ganti',
          findLabel: 'Cari',
          replaceLabel: 'menggantikan',
          findTitle: 'Cari Kandungan:',
          replaceTitle: 'Ganti dengan:',
          tabs: {
            find: 'Cari',
            replace: 'menggantikan'
          },
          filter: {
            re: 'Ungkapan biasa',
            whole: 'Pencocokan perkataan penuh',
            sensitive: 'kes sensitif'
          },
          btns: {
            findNext: 'Cari yang seterusnya',
            findAll: 'Cari semua',
            replace: 'menggantikan',
            replaceAll: 'Ganti semua',
            cancel: 'Batalkan'
          },
          header: {
            seq: '#',
            cell: 'Sel',
            value: 'nilai'
          },
          body: {
            row: 'Baris: {0}',
            col: 'Lajur: {0}'
          },
          empty: '(Nilai null)',
          reError: 'Ungkapan biasa yang tidak sah',
          recordCount: '{0} sel yang dijumpai',
          notCell: 'Sel yang sepadan tidak dapat dijumpai',
          replaceSuccess: '{0} sel berjaya diganti'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: 'Lajur membekukan',
          fixedGroup: 'Membekukan kumpulan',
          cancelFixed: 'Batalkan pembekuan',
          fixedLeft: 'Membekukan sebelah kiri',
          fixedRight: 'Membekukan sebelah kanan'
        },
        cases: {
          equal: 'sama',
          gt: 'Lebih besar daripada',
          lt: 'Kurang daripada',
          begin: 'Permulaannya',
          endin: 'Akhir adalah',
          include: 'Termasuk',
          isSensitive: 'kes sensitif'
        }
      },
      filterCombination: {
        menus: {
          sort: 'Menyusun',
          clearSort: 'Jenis yang jelas',
          sortAsc: 'Perintah menaik',
          sortDesc: 'Perintah menurun',
          fixedColumn: 'Lajur membekukan',
          fixedGroup: 'Membekukan kumpulan',
          cancelFixed: 'Batalkan pembekuan',
          fixedLeft: 'Membekukan sebelah kiri',
          fixedRight: 'Membekukan sebelah kanan',
          clearFilter: 'Penapis jelas',
          textOption: 'Penapisan teks',
          numberOption: 'Penapisan berangka'
        },
        popup: {
          title: 'Kaedah penapisan tersuai',
          currColumnTitle: 'Lajur Semasa:',
          and: 'dan',
          or: 'atau',
          describeHtml: 'Terdapat? Mewakili watak tunggal <br/> penggunaan * mewakili pelbagai aksara'
        },
        cases: {
          equal: 'sama',
          unequal: 'Tidak sama dengan',
          gt: 'Lebih besar daripada',
          ge: 'Lebih besar daripada atau sama dengan',
          lt: 'Kurang daripada',
          le: 'Kurang daripada atau sama dengan',
          begin: 'Permulaannya',
          notbegin: 'Ia bukan pada awal',
          endin: 'Akhir adalah',
          notendin: 'Akhirnya tidak',
          include: 'Termasuk',
          exclude: 'Tidak termasuk',
          between: 'Antara',
          custom: 'Penapisan tersuai',
          insensitive: 'Kes tidak sensitif',
          isSensitive: 'kes sensitif'
        },
        empty: '(kosong)',
        notData: 'Tiada perlawanan'
      }
    },
    pro: {
      area: {
        mergeErr: 'Operasi ini tidak dapat dilakukan pada sel yang digabungkan',
        multiErr: 'Operasi ini tidak dapat dilakukan di kawasan Multi-Select',
        extendErr: 'Sekiranya kawasan lanjutan mengandungi sel yang digabungkan, semua sel yang digabungkan mestilah saiz yang sama',
        pasteMultiErr: 'Tidak dapat menampal, perlu menyalin dan menampal kawasan yang sama untuk melakukan ini'
      },
      fnr: {
        title: 'Cari dan ganti',
        findLabel: 'Cari',
        replaceLabel: 'menggantikan',
        findTitle: 'Cari Kandungan:',
        replaceTitle: 'Ganti dengan:',
        tabs: {
          find: 'Cari',
          replace: 'menggantikan'
        },
        filter: {
          re: 'Ungkapan biasa',
          whole: 'Pencocokan perkataan penuh',
          sensitive: 'kes sensitif'
        },
        btns: {
          findNext: 'Cari yang seterusnya',
          findAll: 'Cari semua',
          replace: 'menggantikan',
          replaceAll: 'Ganti semua',
          cancel: 'Batalkan'
        },
        header: {
          seq: '#',
          cell: 'Sel',
          value: 'nilai'
        },
        empty: '(Nilai null)',
        reError: 'Ungkapan biasa yang tidak sah',
        recordCount: '{0} sel yang dijumpai',
        notCell: 'Sel yang sepadan tidak dapat dijumpai',
        replaceSuccess: '{0} sel berjaya diganti'
      }
    },
    renderer: {
      search: 'cari',
      cases: {
        equal: 'sama',
        unequal: 'Tidak sama dengan',
        gt: 'Lebih besar daripada',
        ge: 'Lebih besar daripada atau sama dengan',
        lt: 'Kurang daripada',
        le: 'Kurang daripada atau sama dengan',
        begin: 'Permulaannya',
        notbegin: 'Ia bukan pada awal',
        endin: 'Akhir adalah',
        notendin: 'Akhirnya tidak',
        include: 'Termasuk',
        exclude: 'Tidak termasuk',
        between: 'Antara',
        custom: 'Penapisan tersuai',
        insensitive: 'Kes tidak sensitif',
        isSensitive: 'kes sensitif'
      },
      combination: {
        menus: {
          sort: 'Menyusun',
          clearSort: 'Jenis yang jelas',
          sortAsc: 'Perintah menaik',
          sortDesc: 'Perintah menurun',
          fixedColumn: 'Lajur membekukan',
          fixedGroup: 'Membekukan kumpulan',
          cancelFixed: 'Batalkan pembekuan',
          fixedLeft: 'Membekukan ke kiri',
          fixedRight: 'Membekukan ke kanan',
          clearFilter: 'Penapis jelas',
          textOption: 'Penapisan teks',
          numberOption: 'Penapisan berangka'
        },
        popup: {
          title: 'Kaedah penapisan tersuai',
          currColumnTitle: 'Lajur Semasa:',
          and: 'dan',
          or: 'atau',
          describeHtml: 'Terdapat? Mewakili watak tunggal <br/> penggunaan * mewakili pelbagai aksara'
        },
        empty: '(kosong)',
        notData: 'Tiada perlawanan'
      }
    }
  }
}
