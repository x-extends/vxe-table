export default {
  vxe: {
    base: {
      pleaseInput: 'Harap masuk',
      pleaseSelect: 'Pilih',
      comma: '，',
      fullStop: '。'
    },
    loading: {
      text: 'memuat...'
    },
    error: {
      downErr: 'Unduh gagal',
      errLargeData: 'Ketika jumlah data terikat terlalu besar, silakan gunakan {0}, jika tidak, itu dapat menyebabkan lag',
      groupFixed: 'Jika menggunakan header yang dikelompokkan, kolom beku harus diatur oleh grup',
      groupMouseRange: 'Header pengelompokan tidak dapat digunakan bersamaan dengan "{0}" dan ini dapat menyebabkan kesalahan',
      groupTag: 'Mengelompokkan header kolom harus menggunakan "{0}" bukan "{1}", yang dapat menyebabkan kesalahan',
      scrollErrProp: 'Parameter ini "{0}" tidak didukung setelah pengguliran virtual diaktifkan',
      errConflicts: 'Parameter "{0}" bertentangan dengan "{1}"',
      modelConflicts: '绑定的字段值 "{0}" 与 "{1}" 存在冲突，将会出现错误',
      reqSupportProp: '当使用 "{0}" 时，应该设置 "{1}"，否则可能会出现错误',
      notSupportProp: '"{1}" tidak didukung ketika parameter "{0}" diaktifkan, itu harus menjadi "{2}", jika tidak kesalahan akan terjadi',
      notConflictProp: 'Saat menggunakan "{0}", "{1}" harus diatur, jika tidak mungkin ada konflik fungsional',
      unableInsert: 'Tidak dapat dimasukkan ke lokasi yang ditentukan, silakan periksa apakah parameternya benar',
      useErr: 'Terjadi kesalahan saat menginstal modul "{0}". Pesanan mungkin salah. Modul dependen perlu diinstal sebelum tabel',
      barUnableLink: 'Toolbar tidak dapat mengaitkan tabel',
      expandContent: 'Slot untuk garis yang diperluas harus "konten", silakan periksa apakah itu benar',
      reqComp: 'Komponen "{0}" hilang, silakan periksa apakah diinstal dengan benar. https://vxeui.com/#/start/useglobal',
      reqModule: 'Modul "{0}" yang hilang',
      reqProp: 'Parameter "{0}" yang diperlukan tidak ada, yang dapat menyebabkan kesalahan',
      emptyProp: 'Parameter "{0}" tidak diperbolehkan kosong',
      errProp: 'Parameter yang tidak didukung "{0}", mungkin "{1}"',
      colRepet: 'kolom. {0} = "{1}" diulangi, yang dapat menyebabkan beberapa fungsi menjadi tidak dapat digunakan',
      notFunc: 'Metode "{0}" tidak ada',
      errFunc: 'Parameter "{0}" bukan metode',
      notValidators: 'Verifikasi global "{0}" tidak ada',
      notFormats: 'Pemformatan global "{0}" tidak ada',
      notCommands: 'Petunjuk global "{0}" tidak ada',
      notSlot: 'Slot "{0}" tidak ada',
      noTree: '"{0}" tidak didukung dalam struktur pohon',
      noGroup: '数据分组后不支持 "{0}"',
      notProp: 'Parameter yang tidak didukung "{0}"',
      checkProp: 'Ketika volume data terlalu besar, kotak centang mungkin tergagap. Disarankan untuk mengatur parameter "{0}" untuk meningkatkan kecepatan rendering',
      coverProp: 'Parameter "{1}" dari "{0}" berulang kali didefinisikan, yang dapat menyebabkan kesalahan',
      uniField: 'Nama bidang "{0}" berulang kali didefinisikan, yang dapat menyebabkan kesalahan',
      repeatKey: 'Ulangi kunci utama {0} = "{1}", yang dapat menyebabkan kesalahan',
      repeatProp: '参数重复 {0}="{1}"，这可能会出现错误',
      delFunc: 'Metode "{0}" sudah usang, silakan gunakan "{1}"',
      delProp: 'Parameter "{0}" sudah usang, silakan gunakan "{1}"',
      delEvent: 'Acara "{0}" sudah usang, silakan gunakan "{1}"',
      removeProp: 'Parameter "{0}" sudah usang dan tidak disarankan, yang dapat menyebabkan kesalahan',
      errFormat: 'Konten yang diformat global harus didefinisikan menggunakan "vxetable.formats" dan metode pemasangan "formatter = {0}" tidak lagi direkomendasikan.',
      notType: 'Jenis file yang tidak didukung "{0}"',
      notExp: 'Browser ini tidak mendukung fungsi impor/ekspor',
      impFields: 'Impor gagal. Silakan periksa apakah nama bidang dan format data benar.',
      treeNotImp: 'Tabel pohon tidak mendukung impor',
      treeCrossDrag: 'Hanya menyeret level pertama',
      treeDragChild: 'Orang tua tidak bisa menyeret ke anak -anak mereka sendiri',
      reqPlugin: '"{1}" tidak diinstal di https://vxeUi.com/other{ 0',
      errMaxRow: 'Melebihi volume data yang didukung maksimum {0}, ini dapat menyebabkan kesalahan',
      useNew: '不建议使用 {0}，请使用 {1}',
      errorVersion: '版本不匹配，当前版本 {0}，最低支持版本为 {1}'
    },
    table: {
      emptyText: 'Belum ada data',
      allTitle: 'Pilih semua/Batal',
      seqTitle: 'Nomor seri',
      actionTitle: 'beroperasi',
      confirmFilter: 'menyaring',
      resetFilter: 'Mengatur ulang',
      allFilter: 'semua',
      sortAsc: 'Urutan menaik: terendah ke tertinggi',
      sortDesc: 'Pesanan menurun: tertinggi ke terendah',
      filter: 'Aktifkan penyaringan untuk kolom yang dipilih',
      impSuccess: 'Berhasil diimpor {0} catatan',
      expLoading: 'Mengekspor',
      expSuccess: 'Ekspor berhasil',
      expError: 'Ekspor gagal',
      expFilename: 'Export_ {0}',
      expOriginFilename: 'Export_source_ {0}',
      customTitle: 'Pengaturan Kolom',
      customAll: 'semua',
      customConfirm: 'mengonfirmasi',
      customClose: 'penutup',
      customCancel: 'Membatalkan',
      customRestore: 'Kembalikan default',
      maxFixedCol: 'Jumlah maksimum kolom beku tidak dapat melebihi {0}',
      maxGroupCol: '最大分组字段的数量不能超过 {0} 个',
      dragTip: 'Pindahkan: {0}',
      resizeColTip: 'Lebar: {0} piksel',
      resizeRowTip: 'Tinggi: {0} piksel',
      rowGroupContentTotal: '{0} ({1})'
    },
    grid: {
      selectOneRecord: 'Pilih setidaknya satu catatan!',
      deleteSelectRecord: 'Anda yakin ingin menghapus catatan yang dipilih?',
      removeSelectRecord: 'Anda yakin ingin menghapus catatan yang dipilih?',
      dataUnchanged: 'Data tidak berubah!',
      delSuccess: 'Catatan yang dipilih berhasil dihapus!',
      saveSuccess: 'Simpan dengan sukses!',
      operError: 'Terjadi kesalahan dan operasinya gagal!'
    },
    select: {
      clear: '清除',
      allChecked: '全选',
      total: '{0} / {1}',
      search: 'mencari',
      loadingText: 'memuat',
      emptyText: 'Belum ada data',
      maxOpt: '最大可选择的数量不能超过 {0} 个',
      overSizeErr: '已超出最大可选数量 {0} 个，超出部分将被忽略！',
      searchEmpty: '未匹配到数据！'
    },
    tree: {
      searchEmpty: '未匹配到数据！'
    },
    treeSelect: {
      clearChecked: '清除',
      allChecked: '全选',
      allExpand: '全部展开',
      clearExpand: '全部收起',
      total: '已选 {0}',
      search: '搜索',
      emptyText: '暂无数据'
    },
    pager: {
      goto: 'Pergi',
      gotoTitle: 'Jumlah halaman',
      pagesize: '{0} item/halaman',
      total: 'Total {0} Records',
      pageClassifier: 'Halaman',
      homePage: 'halaman depan',
      homePageTitle: 'halaman depan',
      prevPage: 'Halaman sebelumnya',
      prevPageTitle: 'Halaman sebelumnya',
      nextPage: 'Halaman berikutnya',
      nextPageTitle: 'Halaman berikutnya',
      prevJump: 'Halaman melompat',
      prevJumpTitle: 'Halaman melompat',
      nextJump: 'Lompat halaman',
      nextJumpTitle: 'Lompat halaman',
      endPage: 'Halaman terakhir',
      endPageTitle: 'Halaman terakhir'
    },
    alert: {
      title: 'Permintaan sistem'
    },
    button: {
      confirm: 'mengonfirmasi',
      cancel: 'Membatalkan',
      clear: 'Jernih'
    },
    filter: {
      search: 'mencari'
    },
    custom: {
      cstmTitle: 'Pengaturan Kolom',
      cstmRestore: 'Kembalikan default',
      cstmCancel: 'Membatalkan',
      cstmConfirm: 'Tentu',
      cstmConfirmRestore: 'Harap konfirmasi apakah itu dipulihkan ke konfigurasi kolom default?',
      cstmDragTarget: 'Pindahkan: {0}',
      setting: {
        colSort: 'Menyortir',
        sortHelpTip: '点击并拖动图标可以调整顺序',
        colTitle: 'Judul kolom',
        colResizable: 'Lebar kolom (piksel)',
        colVisible: 'Apakah akan menampilkan',
        colFixed: 'Kolom beku',
        colFixedMax: 'Kolom beku (hingga {0} kolom)',
        fixedLeft: 'Sisi kiri',
        fixedUnset: 'Tidak diatur',
        fixedRight: 'Sisi kanan'
      }
    },
    import: {
      modes: {
        covering: 'Metode Timpa (Data Tabel Timpa Langsung)',
        insert: 'Tambahkan di bagian bawah (tambahkan data baru di bagian bawah tabel)',
        insertTop: 'Tambahkan di atas (tambahkan data baru di bagian atas tabel)',
        insertBottom: 'Tambahkan di bagian bawah (tambahkan data baru di bagian bawah tabel)'
      },
      impTitle: 'Impor data',
      impFile: 'Nama file',
      impSelect: 'Pilih file',
      impType: 'Jenis file',
      impOpts: 'Pengaturan Parameter',
      impMode: 'Mode Impor',
      impConfirm: 'Impor',
      impCancel: 'Membatalkan'
    },
    export: {
      types: {
        csv: 'CSV (koma terpisah) (*. CSV)',
        html: 'Halaman web (*.html)',
        xml: 'Data XML (*.xml)',
        txt: 'File teks (tab terpisah) (*. Txt)',
        xls: 'Excel 97-2003 Buku Kerja (*.xls)',
        xlsx: 'Excel Workbook (*.xlsx)',
        pdf: 'Pdf (*.pdf)'
      },
      modes: {
        empty: 'Data kosong',
        current: 'Data saat ini (data pada halaman saat ini)',
        selected: 'Data yang dipilih (data yang dipilih pada halaman saat ini)',
        all: 'Data lengkap (termasuk semua data paged)'
      },
      printTitle: 'Data cetak',
      expTitle: 'Ekspor Data',
      expName: 'Nama file',
      expNamePlaceholder: 'Harap masukkan nama file',
      expSheetName: 'judul',
      expSheetNamePlaceholder: 'Harap masukkan judul',
      expType: 'Simpan tipe',
      expMode: 'Pilih Data',
      expCurrentColumn: 'Semua bidang',
      expColumn: 'Pilih bidang',
      expOpts: 'Pengaturan Parameter',
      expOptHeader: 'Header',
      expHeaderTitle: 'Apakah header meja diperlukan',
      expOptFooter: 'Akhir meja',
      expFooterTitle: 'Apakah akhir tabel diperlukan?',
      expOptColgroup: 'Header pengelompokan',
      expOptTitle: 'Judul kolom',
      expTitleTitle: 'Apakah itu judul kolom, jika tidak, itu akan ditampilkan sebagai nama bidang kolom',
      expColgroupTitle: 'Jika ada, header dengan struktur pengelompokan didukung',
      expOptMerge: 'menggabungkan',
      expMergeTitle: 'Jika ada, sel dengan struktur gabungan didukung',
      expOptAllExpand: 'Perluas pohon',
      expAllExpandTitle: 'Jika ada, didukung untuk memperluas semua data dengan struktur hierarkis',
      expOptUseStyle: 'gaya',
      expUseStyleTitle: 'Jika ada, sel dengan gaya didukung',
      expOptOriginal: 'Data sumber',
      expOriginalTitle: 'Jika itu adalah data sumber, impor ke tabel didukung',
      expPrint: 'Mencetak',
      expConfirm: 'Ekspor',
      expCancel: 'Membatalkan'
    },
    modal: {
      errTitle: 'Pesan kesalahan',
      zoomMin: 'Memperkecil',
      zoomIn: 'Maksimalkan',
      zoomOut: 'pengurangan',
      close: 'penutup',
      miniMaxSize: 'Jumlah jendela yang diminimalkan tidak dapat melebihi {0}',
      footPropErr: 'show-footer hanya digunakan untuk mengaktifkan ekor meja, dan harus digunakan dengan show-konfirmasi | THEET-CANCEL-TUTHTON | slot'
    },
    drawer: {
      close: 'penutup'
    },
    form: {
      folding: 'Menutup',
      unfolding: 'Memperluas'
    },
    toolbar: {
      import: 'Impor',
      export: 'Ekspor',
      print: 'Mencetak',
      refresh: 'menyegarkan',
      zoomIn: 'layar penuh',
      zoomOut: 'pengurangan',
      custom: 'Pengaturan Kolom',
      customAll: 'semua',
      customConfirm: 'mengonfirmasi',
      customRestore: 'Mengatur ulang',
      fixedLeft: 'Beku kiri',
      fixedRight: 'Bekukan benar',
      cancelFixed: 'Unfreeze'
    },
    datePicker: {
      yearTitle: '{0} tahun'
    },
    dateRangePicker: {
      pleaseRange: '请选择开始日期与结束日期'
    },
    input: {
      date: {
        m1: 'Januari',
        m2: 'Februari',
        m3: 'Berbaris',
        m4: 'April',
        m5: 'Mungkin',
        m6: 'Juni',
        m7: 'Juli',
        m8: 'Agustus',
        m9: 'September',
        m10: 'Oktober',
        m11: 'November',
        m12: 'Desember',
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
          w0: 'Matahari',
          w1: 'Senin',
          w2: 'Sel',
          w3: 'Menikahi',
          w4: 'Kamis',
          w5: 'Jum',
          w6: 'Duduk'
        },
        months: {
          m0: 'Januari',
          m1: 'Februari',
          m2: 'Berbaris',
          m3: 'April',
          m4: 'Mungkin',
          m5: 'Juni',
          m6: 'Juli',
          m7: 'Agustus',
          m8: 'September',
          m9: 'Oktober',
          m10: 'November',
          m11: 'Desember'
        },
        quarters: {
          q1: 'Kuartal pertama',
          q2: 'Kuartal kedua',
          q3: 'Kuartal ketiga',
          q4: 'Kuartal keempat'
        }
      }
    },
    numberInput: {
      currencySymbol: '$'
    },
    imagePreview: {
      popupTitle: 'Pratinjau',
      operBtn: {
        zoomOut: 'Menyusut',
        zoomIn: 'memperbesar',
        pctFull: 'Penskalaan sama',
        pct11: 'Tunjukkan ukuran asli',
        rotateLeft: 'Putar kiri',
        rotateRight: 'Berputar ke kanan',
        print: 'Klik untuk mencetak gambar',
        download: 'Klik untuk mengunduh gambar'
      }
    },
    upload: {
      fileBtnText: 'Klik atau seret untuk mengunggah',
      imgBtnText: 'Klik atau seret untuk mengunggah',
      dragPlaceholder: 'Harap seret dan letakkan file ke area ini untuk diunggah',
      imgSizeHint: 'Selebaran {0}',
      imgCountHint: 'Gambar maksimum {0}',
      fileTypeHint: 'Dukungan {0} jenis file',
      fileSizeHint: 'Ukuran file tunggal tidak melebihi {0}',
      fileCountHint: 'Hingga {0} file dapat diunggah',
      uploadTypeErr: 'Jenis File Ketidakcocokan!',
      overCountErr: 'Hanya {0} file yang paling banyak dapat dipilih!',
      overCountExtraErr: 'Jumlah maksimum {0} telah terlampaui, dan file kelebihan {1} akan diabaikan!',
      overSizeErr: 'Ukuran file maksimum tidak dapat melebihi {0}!',
      manualUpload: '点击上传',
      reUpload: 'Mengunggah ulang',
      uploadProgress: 'Mengunggah {0}%',
      uploadErr: 'Unggah gagal',
      uploadSuccess: 'Unggah berhasil',
      moreBtnText: 'Lebih ({0})',
      viewItemTitle: 'Klik untuk dilihat',
      morePopup: {
        readTitle: 'Daftar Lihat',
        imageTitle: 'Unggah gambar',
        fileTitle: 'Unggah file'
      }
    },
    empty: {
      defText: 'Belum ada data'
    },
    colorPicker: {
      clear: 'Jernih',
      confirm: 'mengonfirmasi',
      copySuccess: 'Disalin ke clipboard: {0}',
      hex: 'HEX'
    },
    formDesign: {
      formName: 'Nama bentuk',
      defFormTitle: 'Bentuk yang tidak disebutkan namanya',
      widgetPropTab: 'Properti kontrol',
      widgetFormTab: 'Membentuk properti',
      error: {
        wdFormUni: 'Jenis kontrol ini diizinkan untuk menambahkan hanya satu dalam formulir',
        wdSubUni: 'Jenis kontrol ini diizinkan untuk menambahkan hanya satu di subtabel'
      },
      styleSetting: {
        btn: 'Pengaturan Gaya',
        title: 'Pengaturan gaya bentuk',
        layoutTitle: 'Tata letak kontrol',
        verticalLayout: 'Tata letak atas dan bawah',
        horizontalLayout: 'Tata letak horizontal',
        styleTitle: 'Gaya judul',
        boldTitle: 'Judul tebal',
        fontBold: 'Berani',
        fontNormal: 'konvensional',
        colonTitle: 'Tunjukkan Colon',
        colonVisible: 'menunjukkan',
        colonHidden: 'bersembunyi',
        alignTitle: 'Penyelarasan',
        widthTitle: 'Lebar judul',
        alignLeft: 'Di sebelah kiri',
        alignRight: 'Di sebelah kanan',
        unitPx: 'Piksel',
        unitPct: 'persentase'
      },
      widget: {
        group: {
          base: 'Kontrol Dasar',
          layout: 'Kontrol tata letak',
          system: 'Kontrol sistem',
          module: 'Kontrol modul',
          chart: 'Kontrol Bagan',
          advanced: 'Kontrol lanjutan'
        },
        copyTitle: 'Copy_ {0}',
        component: {
          input: 'Kotak input',
          textarea: 'Bidang teks',
          select: 'Tarik ke bawah untuk memilih',
          row: 'Satu baris dan beberapa kolom',
          title: 'judul',
          text: 'teks',
          subtable: 'Sub-tab',
          VxeSwitch: 'apakah',
          VxeInput: 'Kotak input',
          VxeNumberInput: 'nomor',
          VxeDatePicker: 'tanggal',
          VxeTextarea: 'Bidang teks',
          VxeSelect: 'Tarik ke bawah untuk memilih',
          VxeTreeSelect: 'Pemilihan pohon',
          VxeRadioGroup: 'Tombol radio',
          VxeCheckboxGroup: 'Kotak centang',
          VxeUploadFile: 'dokumen',
          VxeUploadImage: 'gambar',
          VxeRate: 'skor',
          VxeSlider: 'Slider'
        }
      },
      widgetProp: {
        name: 'Nama kontrol',
        placeholder: 'Mengingatkan',
        required: 'Verifikasi yang diperlukan',
        multiple: 'Beberapa pilihan diperbolehkan',
        displaySetting: {
          name: 'Tampilkan Pengaturan',
          pc: 'PC',
          mobile: 'Mobile',
          visible: 'menunjukkan',
          hidden: 'bersembunyi'
        },
        dataSource: {
          name: 'Sumber data',
          defValue: 'Opsi {0}',
          addOption: 'Tambahkan opsi',
          batchEditOption: 'Pengeditan batch',
          batchEditTip: 'Setiap baris sesuai dengan opsi, yang mendukung salinan langsung dan tempel dari tabel, Excel, dan WPS.',
          batchEditSubTip: 'Setiap baris sesuai dengan opsi. Jika itu adalah grup, item anak dapat dimulai dengan ruang atau kunci tab, dan mendukung salinan langsung dan tempel dari tabel, Excel, dan WPS.',
          buildOption: 'Bangun opsi'
        },
        rowProp: {
          colSize: 'Jumlah kolom',
          col2: 'Dua kolom',
          col3: 'Tiga kolom',
          col4: 'Empat kolom',
          col6: 'Enam kolom',
          layout: 'tata letak'
        },
        textProp: {
          name: 'isi',
          alignTitle: 'Penyelarasan',
          alignLeft: 'Di sebelah kiri',
          alignCenter: 'Tengah',
          alignRight: 'Di sebelah kanan',
          colorTitle: 'Warna font',
          sizeTitle: 'Ukuran font',
          boldTitle: 'Font tebal',
          fontNormal: 'konvensional',
          fontBold: 'Berani'
        },
        subtableProp: {
          seqTitle: 'Nomor seri',
          showSeq: 'Tunjukkan nomor seri',
          showCheckbox: 'Beberapa pilihan diperbolehkan',
          errSubDrag: 'Subtable tidak mendukung kontrol ini, silakan gunakan kontrol lain',
          colPlace: 'Seret Kontrol'
        },
        uploadProp: {
          limitFileCount: 'Batas kuantitas file',
          limitFileSize: 'Batas ukuran file',
          multiFile: 'Izinkan beberapa file diunggah',
          limitImgCount: 'Batasi jumlah gambar',
          limitImgSize: 'Batas ukuran gambar',
          multiImg: 'Izinkan beberapa gambar untuk mengunggah'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Pengaturan Bidang',
      listSettingTab: 'Pengaturan Parameter',
      searchTitle: 'Kriteria kueri',
      listTitle: 'Bidang Daftar',
      searchField: 'Bidang kueri',
      listField: 'Bidang Daftar',
      activeBtn: {
        ActionButtonUpdate: 'edit',
        ActionButtonDelete: 'menghapus'
      },
      search: {
        addBtn: 'edit',
        emptyText: 'Kondisi kueri yang tidak dikonfigurasi',
        editPopupTitle: 'Edit bidang kueri'
      },
      searchPopup: {
        colTitle: 'judul',
        saveBtn: 'menyimpan'
      }
    },
    text: {
      copySuccess: 'Disalin ke clipboard',
      copyError: 'Lingkungan saat ini tidak mendukung operasi ini'
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
    gantt: {
      tFullFormat: {
        year: '{yy}年',
        quarter: '{yy}年第{q}季度',
        month: '{yy}年{M}月',
        week: '{yy}年第{W}周',
        day: '{yy}年{M}月{d}日',
        hour: '{yy}年 {M}月{d}日{H}时',
        minute: '{yy}年{M}月{d}日{H}时{m}分'
      },
      tSimpleFormat: {
        year: '{yy}年',
        quarter: '{q}季度',
        month: '{M}月',
        week: '{W}周',
        day: '{d}',
        hour: '{H}时',
        minute: '{m}分'
      },
      dayss: {
        w0: '日',
        w1: '一',
        w2: '二',
        w3: '三',
        w4: '四',
        w5: '五',
        w6: '六'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: 'Operasi ini tidak dapat dilakukan pada sel gabungan',
          multiErr: 'Operasi ini tidak dapat dilakukan di beberapa area seleksi',
          selectErr: 'Tidak dapat beroperasi pada sel dalam kisaran yang ditentukan',
          extendErr: 'Jika kisaran yang diperluas mengandung sel gabungan, semua sel gabungan harus memiliki ukuran yang sama',
          pasteMultiErr: 'Tidak dapat menempel, area yang disalin dan disisipkan harus memiliki ukuran yang sama untuk melakukan operasi ini',
          cpInvalidErr: 'Operasi tidak dapat dilakukan. Ada kolom terlarang ({0}) dalam kisaran yang Anda pilih.'
        },
        fnr: {
          title: 'Temukan dan ganti',
          findLabel: 'Menemukan',
          replaceLabel: 'mengganti',
          findTitle: 'Temukan apa:',
          replaceTitle: 'Ganti dengan:',
          tabs: {
            find: 'Menemukan',
            replace: 'mengganti'
          },
          filter: {
            re: 'Ekspresi reguler',
            whole: 'Pencocokan kata lengkap',
            sensitive: 'Sensitif Kasus'
          },
          btns: {
            findNext: 'Temukan selanjutnya',
            findAll: 'Temukan semuanya',
            replace: 'mengganti',
            replaceAll: 'Ganti semua',
            cancel: 'Membatalkan'
          },
          header: {
            seq: '#',
            cell: 'Sel',
            value: 'nilai'
          },
          body: {
            row: 'Baris: {0}',
            col: 'Kolom: {0}'
          },
          empty: '(Nilai nol)',
          reError: 'Ekspresi reguler tidak valid',
          recordCount: '{0} sel ditemukan',
          notCell: 'Sel pencocokan tidak dapat ditemukan',
          replaceSuccess: 'Berhasil menggantikan {0} sel'
        }
      },
      extendPivotTable: {
        aggregation: {
          grouping: '分组',
          values: '值',
          groupPlaceholder: '拖至此处进行分组',
          valuesPlaceholder: '拖至此处进行聚合',
          dragExistCol: '该列已存在',
          sortHelpTip: '点击并拖动图标可以调整顺序'
        },
        aggFuncs: {
          sum: '求和',
          count: '计数',
          avg: '平均值',
          min: '最小值',
          max: '最大值',
          first: '首个值',
          last: '末尾值'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: 'Kolom beku',
          fixedGroup: 'Grup beku',
          cancelFixed: 'Unfreeze',
          fixedLeft: 'Beku kiri',
          fixedRight: 'Bekukan benar'
        },
        cases: {
          equal: 'setara',
          gt: 'Lebih besar dari',
          lt: 'Kurang dari',
          begin: 'Awal adalah',
          endin: 'Akhirnya',
          include: 'Termasuk',
          isSensitive: 'Sensitif Kasus'
        }
      },
      filterCombination: {
        menus: {
          sort: 'Menyortir',
          clearSort: 'Sortir yang jelas',
          sortAsc: 'Pesanan naik',
          sortDesc: 'pesanan menurun',
          fixedColumn: 'Kolom beku',
          fixedGroup: 'Grup beku',
          cancelFixed: 'Unfreeze',
          fixedLeft: 'Beku kiri',
          fixedRight: 'Bekukan benar',
          clearFilter: 'CLEAR FILTER',
          textOption: 'Filter teks',
          numberOption: 'Filter numerik'
        },
        popup: {
          title: 'Metode pemfilteran khusus',
          currColumnTitle: 'Kolom saat ini:',
          and: 'Dan',
          or: 'atau',
          describeHtml: 'Tersedia? Mewakili satu karakter <br/> penggunaan * mewakili banyak karakter'
        },
        cases: {
          equal: 'setara',
          unequal: 'Tidak sama dengan',
          gt: 'Lebih besar dari',
          ge: 'Lebih besar dari atau sama dengan',
          lt: 'Kurang dari',
          le: 'Kurang dari atau sama dengan',
          begin: 'Awal adalah',
          notbegin: 'Itu bukan di awal',
          endin: 'Akhirnya',
          notendin: 'Akhirnya tidak',
          include: 'Termasuk',
          exclude: 'Tidak termasuk',
          between: 'Di antara',
          custom: 'Filter khusus',
          insensitive: 'Kasus tidak sensitif',
          isSensitive: 'Sensitif Kasus'
        },
        empty: '(kosong)',
        notData: 'Tidak cocok'
      }
    },
    pro: {
      area: {
        mergeErr: 'Operasi ini tidak dapat dilakukan pada sel gabungan',
        multiErr: 'Operasi ini tidak dapat dilakukan di beberapa area seleksi',
        extendErr: 'Jika kisaran yang diperluas mengandung sel gabungan, semua sel gabungan harus memiliki ukuran yang sama',
        pasteMultiErr: 'Tidak dapat menempel, area yang disalin dan disisipkan harus memiliki ukuran yang sama untuk melakukan operasi ini'
      },
      fnr: {
        title: 'Temukan dan ganti',
        findLabel: 'Menemukan',
        replaceLabel: 'mengganti',
        findTitle: 'Temukan konten:',
        replaceTitle: 'Ganti dengan:',
        tabs: {
          find: 'Menemukan',
          replace: 'mengganti'
        },
        filter: {
          re: 'Ekspresi reguler',
          whole: 'Pencocokan kata lengkap',
          sensitive: 'Sensitif Kasus'
        },
        btns: {
          findNext: 'Temukan selanjutnya',
          findAll: 'Temukan semuanya',
          replace: 'mengganti',
          replaceAll: 'Ganti semua',
          cancel: 'Membatalkan'
        },
        header: {
          seq: '#',
          cell: 'Sel',
          value: 'nilai'
        },
        empty: '(Nilai nol)',
        reError: 'Ekspresi reguler tidak valid',
        recordCount: '{0} sel ditemukan',
        notCell: 'Tidak ada sel yang cocok yang ditemukan',
        replaceSuccess: 'Berhasil menggantikan {0} sel'
      }
    },
    renderer: {
      search: 'mencari',
      cases: {
        equal: 'setara',
        unequal: 'Tidak sama dengan',
        gt: 'Lebih besar dari',
        ge: 'Lebih besar dari atau sama dengan',
        lt: 'Kurang dari',
        le: 'Kurang dari atau sama dengan',
        begin: 'Awal adalah',
        notbegin: 'Itu bukan di awal',
        endin: 'Akhirnya',
        notendin: 'Akhirnya tidak',
        include: 'Termasuk',
        exclude: 'Tidak termasuk',
        between: 'Di antara',
        custom: 'Filter khusus',
        insensitive: 'Kasus tidak sensitif',
        isSensitive: 'Sensitif Kasus'
      },
      combination: {
        menus: {
          sort: 'Menyortir',
          clearSort: 'Sortir yang jelas',
          sortAsc: 'Pesanan naik',
          sortDesc: 'pesanan menurun',
          fixedColumn: 'Kolom beku',
          fixedGroup: 'Grup beku',
          cancelFixed: 'Unfreeze',
          fixedLeft: 'Beku kiri',
          fixedRight: 'Bekukan benar',
          clearFilter: 'CLEAR FILTER',
          textOption: 'Pemfilteran teks',
          numberOption: 'Penyaringan numerik'
        },
        popup: {
          title: 'Metode pemfilteran khusus',
          currColumnTitle: 'Kolom saat ini:',
          and: 'Dan',
          or: 'atau',
          describeHtml: 'Tersedia? Mewakili satu karakter <br/> penggunaan * mewakili banyak karakter'
        },
        empty: '(kosong)',
        notData: 'Tidak cocok'
      }
    }
  }
}
