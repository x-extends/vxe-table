export default {
  vxe: {
    base: {
      pleaseInput: 'Silakan masukkan',
      pleaseSelect: 'Silakan pilih',
      comma: ',',
      fullStop: '.'
    },
    loading: {
      text: 'Memuat...'
    },
    error: {
      downErr: 'Gagal mengunduh',
      errLargeData: 'Jika jumlah data yang terikat terlalu besar, gunakan {0}, jika tidak maka dapat terjadi lag',
      groupFixed: 'Jika menggunakan header grup, kolom tetap harus diatur per grup',
      groupMouseRange: 'Header grup tidak dapat digunakan bersamaan dengan "{0}", ini dapat menyebabkan kesalahan',
      groupTag: 'Kolom header grup harus menggunakan "{0}" bukan "{1}", ini dapat menyebabkan kesalahan',
      scrollErrProp: 'Setelah scroll virtual diaktifkan, parameter "{0}" tidak didukung',
      errConflicts: 'Parameter "{0}" berkonflik dengan "{1}"',
      modelConflicts: 'Nilai field terikat "{0}" berkonflik dengan "{1}", akan terjadi kesalahan',
      notSupportProp: 'Saat parameter "{0}" diaktifkan, "{1}" tidak didukung, harus "{2}", jika tidak akan terjadi kesalahan',
      reqSupportProp: 'Saat menggunakan "{0}", sebaiknya atur "{1}", jika tidak dapat terjadi kesalahan',
      notConflictProp: 'Saat menggunakan "{0}", sebaiknya atur "{1}", jika tidak dapat terjadi konflik fungsional',
      unableInsert: 'Tidak dapat menyisipkan ke posisi yang ditentukan, periksa apakah parameter sudah benar',
      useErr: 'Terjadi kesalahan saat menginstal modul "{0}", urutan mungkin tidak benar, modul dependen harus diinstal sebelum Table',
      barUnableLink: 'Toolbar tidak dapat terhubung ke tabel',
      expandContent: 'Slot baris yang diperluas harus "content", periksa apakah sudah benar',
      reqComp: 'Komponen "{0}" tidak ada, periksa apakah sudah terinstal dengan benar. https://vxeui.com/#/start/useUI/useGlobal',
      reqModule: 'Modul "{0}" tidak ada',
      reqProp: 'Parameter wajib "{0}" tidak ada, ini dapat menyebabkan kesalahan',
      emptyProp: 'Parameter "{0}" tidak boleh kosong',
      errProp: 'Parameter "{0}" tidak didukung, mungkin "{1}"',
      colRepet: 'column.{0}="{1}" duplikat, ini dapat menyebabkan beberapa fungsi tidak dapat digunakan',
      notFunc: 'Metode "{0}" tidak ada',
      errFunc: 'Parameter "{0}" bukan sebuah metode',
      notValidators: 'Validator global "{0}" tidak ada',
      notFormats: 'Formatter global "{0}" tidak ada',
      notCommands: 'Perintah global "{0}" tidak ada',
      notSlot: 'Slot "{0}" tidak ada',
      noTree: 'Struktur pohon tidak mendukung "{0}"',
      noGroup: 'Setelah pengelompokan data, "{0}" tidak didukung',
      notProp: 'Parameter "{0}" tidak didukung',
      returnErr: 'Nilai kembali parameter "{0}" diharapkan "{1}" tetapi sebenarnya "{2}"',
      notSupportReturn: 'Saat nilai kembali adalah "{0}", parameter harus menggunakan "{1}" bukan "{2}"',
      checkProp: 'Jika jumlah data terlalu besar, kotak centang dapat lag; disarankan mengatur parameter "{0}" untuk meningkatkan kecepatan rendering',
      coverProp: 'Parameter "{1}" dari "{0}" didefinisikan ganda, ini dapat menyebabkan kesalahan',
      uniField: 'Nama field "{0}" didefinisikan ganda, ini dapat menyebabkan kesalahan',
      repeatKey: 'Kunci utama duplikat {0}="{1}", ini dapat menyebabkan kesalahan',
      repeatProp: 'Parameter duplikat {0}="{1}", ini dapat menyebabkan kesalahan',
      delFunc: 'Metode "{0}" sudah usang, gunakan "{1}"',
      delProp: 'Parameter "{0}" sudah usang, gunakan "{1}"',
      delEvent: 'Event "{0}" sudah usang, gunakan "{1}"',
      removeProp: 'Parameter "{0}" sudah usang dan tidak disarankan, ini dapat menyebabkan kesalahan',
      errFormat: 'Konten format global harus didefinisikan menggunakan "VXETable.formats", memasang "formatter={0}" tidak lagi disarankan',
      notType: 'Tipe file "{0}" tidak didukung',
      notExp: 'Browser ini tidak mendukung fungsi impor/ekspor',
      impFields: 'Impor gagal, periksa apakah nama field dan format data sudah benar',
      treeNotImp: 'Tabel pohon tidak mendukung impor',
      treeCrossDrag: 'Hanya dapat menyeret tingkat pertama',
      treeDragChild: 'Induk tidak dapat diseret ke anaknya sendiri',
      reqPlugin: 'Plugin ekstensi belum diinstal "{1}" https://vxeui.com/other{0}/#/{1}/start/npmInstall',
      errMaxRow: 'Melebihi jumlah data maksimum yang didukung {0} baris, ini dapat menyebabkan kesalahan',
      useNew: 'Tidak disarankan menggunakan {0}, gunakan {1}',
      errorVersion: 'Versi tidak cocok, versi saat ini {0}, versi minimum yang didukung adalah {1}',
      errMaxVersion: '版本不匹配，当前版本 {0}，最高支持版本为 {1}'
    },
    table: {
      emptyText: 'Tidak ada data',
      allTitle: 'Pilih semua/Batal',
      seqTitle: 'No.',
      actionTitle: 'Aksi',
      confirmFilter: 'Filter',
      resetFilter: 'Reset',
      allFilter: 'Semua',
      sortAsc: 'Naik: terendah ke tertinggi',
      sortDesc: 'Turun: tertinggi ke terendah',
      filter: 'Aktifkan filter untuk kolom yang dipilih',
      impSuccess: 'Berhasil mengimpor {0} catatan',
      expLoading: 'Sedang mengekspor',
      expSuccess: 'Ekspor berhasil',
      expError: 'Ekspor gagal',
      expFilename: 'Ekspor_{0}',
      expOriginFilename: 'Ekspor_Sumber_{0}',
      customTitle: 'Pengaturan khusus',
      customAll: 'Semua',
      customConfirm: 'Konfirmasi',
      customClose: 'Tutup',
      customCancel: 'Batal',
      customRestore: 'Kembalikan default',
      maxFixedCol: 'Jumlah maksimum kolom tetap tidak boleh melebihi {0}',
      maxGroupCol: 'Jumlah maksimum field grup tidak boleh melebihi {0}',
      dragTip: 'Pindahkan: {0}',
      resizeColTip: 'Lebar: {0} piksel',
      resizeRowTip: 'Tinggi: {0} piksel',
      rowGroupContentTotal: '{0} ({1})',
      menuLoading: 'Memuat...'
    },
    grid: {
      selectOneRecord: 'Pilih setidaknya satu catatan!',
      deleteSelectRecord: 'Apakah Anda yakin ingin menghapus catatan yang dipilih?',
      removeSelectRecord: 'Apakah Anda yakin ingin menghapus catatan yang dipilih?',
      dataUnchanged: 'Data tidak berubah!',
      delSuccess: 'Berhasil menghapus catatan yang dipilih!',
      saveSuccess: 'Berhasil disimpan!',
      operError: 'Terjadi kesalahan, operasi gagal!'
    },
    select: {
      clear: 'Hapus',
      allChecked: 'Pilih semua',
      total: '{0} item dipilih',
      close: 'Tutup',
      search: 'Cari',
      loadingText: 'Memuat...',
      emptyText: 'Tidak ada data',
      maxSize: 'Jumlah maksimum yang dapat dipilih tidak boleh melebihi {0}',
      overSizeErr: 'Melebihi jumlah maksimum yang dapat dipilih {0}, kelebihan akan diabaikan!',
      searchEmpty: 'Tidak ada data yang cocok!'
    },
    list: {
      allChecked: 'Pilih semua',
      dragTip: 'Pindahkan: {0}'
    },
    tree: {
      searchEmpty: 'Tidak ada data yang cocok!',
      dragTip: 'Pindahkan: {0}'
    },
    treeSelect: {
      clearChecked: 'Hapus',
      allChecked: 'Pilih semua',
      allExpand: 'Perluas semua',
      clearExpand: 'Ciutkan semua',
      total: '{0} item dipilih',
      filterCount: 'Ditemukan {0} catatan',
      close: 'Tutup',
      search: 'Cari',
      emptyText: 'Tidak ada data'
    },
    tableSelect: {
      filterCount: 'Ditemukan {0} catatan'
    },
    pager: {
      goto: 'Ke',
      gotoTitle: 'Halaman',
      pagesize: '{0}/halaman',
      total: 'Total {0} catatan',
      pageClassifier: 'Halaman',
      homePage: 'Beranda',
      homePageTitle: 'Halaman pertama',
      prevPage: 'Sebelumnya',
      prevPageTitle: 'Halaman sebelumnya',
      nextPage: 'Berikutnya',
      nextPageTitle: 'Halaman berikutnya',
      prevJump: 'Lompat ke atas',
      prevJumpTitle: 'Lompat ke atas',
      nextJump: 'Lompat ke bawah',
      nextJumpTitle: 'Lompat ke bawah',
      endPage: 'Terakhir',
      endPageTitle: 'Halaman terakhir'
    },
    alert: {
      title: 'Pesan sistem'
    },
    button: {
      confirm: 'Konfirmasi',
      cancel: 'Batal',
      clear: 'Hapus'
    },
    filter: {
      search: 'Cari'
    },
    custom: {
      cstmTitle: 'Pengaturan khusus',
      cstmRestore: 'Kembalikan default',
      cstmCancel: 'Batal',
      cstmConfirm: 'OK',
      cstmConfirmRestore: 'Apakah Anda yakin ingin mengembalikan konfigurasi kolom default?',
      cstmDragTarget: 'Pindahkan: {0}',
      setting: {
        colSort: 'Urutkan',
        sortHelpTip: 'Klik ikon untuk mulai menyeret',
        colTitle: 'Judul kolom',
        colResizable: 'Lebar kolom (piksel)',
        colVisible: 'Tampilkan',
        colFixed: 'Kolom tetap',
        colFixedMax: 'Kolom tetap ({0})',
        colAlign: 'Perataan',
        colHeadAlign: 'Perataan header',
        colFootAlign: 'Perataan footer',
        fixedLeft: 'Kiri',
        fixedUnset: 'Tidak ada',
        fixedRight: 'Kanan',
        alignLeft: 'Kiri',
        alignCenter: 'Tengah',
        alignRight: 'Kanan',
        moveUp: 'Pindah ke atas',
        moveDn: 'Pindah ke bawah',
        putTop: 'Pindah ke atas',
        putBottom: 'Pindah ke bawah',
        moveUpTitle: 'Klik untuk pindah ke atas',
        moveDnTitle: 'Klik untuk pindah ke bawah',
        putTopTitle: 'Klik untuk pindah ke atas',
        putBottomTitle: 'Klik untuk pindah ke bawah',
        anLeftTitle: 'Rata kiri',
        anCenterTitle: 'Rata tengah',
        anRightTitle: 'Rata kanan'
      }
    },
    import: {
      modes: {
        covering: 'Timpa (langsung timpa data tabel)',
        insert: 'Tambah di akhir (tambahkan data baru di akhir tabel)',
        insertTop: 'Tambah di awal (tambahkan data baru di awal tabel)',
        insertBottom: 'Tambah di akhir (tambahkan data baru di akhir tabel)'
      },
      impTitle: 'Impor data',
      impFile: 'Nama file',
      impSelect: 'Pilih file',
      impType: 'Tipe file',
      impOpts: 'Pengaturan',
      impMode: 'Mode impor',
      impConfirm: 'Impor',
      impCancel: 'Batal'
    },
    export: {
      types: {
        csv: 'CSV (dipisahkan koma)(*.csv)',
        html: 'Halaman web(*.html)',
        xml: 'Data XML(*.xml)',
        txt: 'File teks (dipisahkan tab)(*.txt)',
        xls: 'Buku Kerja Excel 97-2003(*.xls)',
        xlsx: 'Buku Kerja Excel(*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        empty: 'Data kosong',
        current: 'Data saat ini (data halaman saat ini)',
        selected: 'Data terpilih (data yang dipilih di halaman saat ini)',
        all: 'Semua data (termasuk data semua halaman)'
      },
      printTitle: 'Cetak data',
      expTitle: 'Ekspor data',
      expName: 'Nama file',
      expNamePlaceholder: 'Masukkan nama file',
      expSheetName: 'Judul',
      expSheetNamePlaceholder: 'Masukkan judul',
      expType: 'Tipe penyimpanan',
      expMode: 'Pilih data',
      expCurrentColumn: 'Semua field',
      expColumn: 'Pilih field',
      widthMode: 'Pengaturan lebar kolom',
      wModeTitle: 'Atur cara rendering lebar kolom saat mencetak',
      wdModes: {
        default: 'Default',
        auto: 'Otomatis (sesuaikan lebar kolom berdasarkan konten)',
        scale: 'Skala (render lebar kolom sesuai skala halaman)'
      },
      expOpts: 'Pengaturan',
      expOptHeader: 'Header',
      expHeaderTitle: 'Apakah perlu header',
      expOptFooter: 'Footer',
      expFooterTitle: 'Apakah perlu footer',
      expOptColgroup: 'Header grup',
      expOptTitle: 'Judul kolom',
      expTitleTitle: 'Apakah menggunakan judul kolom, jika tidak tampilkan nama field kolom',
      expColgroupTitle: 'Jika ada, mendukung header dengan struktur grup',
      expOptMerge: 'Gabung',
      expMergeTitle: 'Jika ada, mendukung sel dengan struktur gabungan',
      expOptAllExpand: 'Perluas pohon',
      expAllExpandTitle: 'Jika ada, mendukung perluasan semua data dengan struktur hierarki',
      expOptTreeAllExpand: 'Perluas pohon',
      expTreeAllExpandTitle: 'Jika ada, otomatis perluas semua tingkat pohon',
      expOptRowGroupAllExpand: 'Perluas grup',
      expRowGroupAllExpandTitle: 'Jika ada, otomatis perluas semua tingkat grup',
      expOptUseStyle: 'Gaya',
      expUseStyleTitle: 'Jika ada, mendukung sel dengan gaya',
      expOptOriginal: 'Data sumber',
      expOriginalTitle: 'Jika data sumber, mendukung impor ke tabel',
      expPrint: 'Cetak',
      expConfirm: 'Ekspor',
      expCancel: 'Batal'
    },
    modal: {
      errTitle: 'Kesalahan',
      zoomMin: 'Minimalkan',
      zoomIn: 'Maksimalkan',
      zoomOut: 'Kembalikan',
      close: 'Tutup',
      miniMaxSize: 'Jumlah jendela yang diminimalkan tidak boleh melebihi {0}',
      footPropErr: 'show-footer hanya digunakan untuk mengaktifkan footer, harus digunakan dengan show-confirm-button | show-cancel-button | slot'
    },
    drawer: {
      close: 'Tutup'
    },
    form: {
      folding: 'Ciutkan',
      unfolding: 'Perluas'
    },
    toolbar: {
      import: 'Impor',
      export: 'Ekspor',
      print: 'Cetak',
      refresh: 'Segarkan',
      zoomIn: 'Layar penuh',
      zoomOut: 'Kembalikan',
      custom: 'Pengaturan khusus',
      customAll: 'Semua',
      customConfirm: 'Konfirmasi',
      customRestore: 'Reset',
      fixedLeft: 'Tetap di kiri',
      fixedRight: 'Tetap di kanan',
      cancelFixed: 'Batalkan kolom tetap'
    },
    iconPicker: {
      search: 'Cari',
      emptyText: 'Tidak ada data'
    },
    datePicker: {
      yearTitle: 'Tahun {0}'
    },
    dateRangePicker: {
      pleaseRange: 'Silakan pilih tanggal mulai dan tanggal akhir'
    },
    input: {
      date: {
        m1: 'Jan',
        m2: 'Feb',
        m3: 'Mar',
        m4: 'Apr',
        m5: 'Mei',
        m6: 'Jun',
        m7: 'Jul',
        m8: 'Agu',
        m9: 'Sep',
        m10: 'Okt',
        m11: 'Nov',
        m12: 'Des',
        quarterLabel: 'Kuartal {0}',
        monthLabel: 'Bulan {0}',
        dayLabel: '{0} {1}',
        labelFormat: {
          date: 'yyyy-MM-dd',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: 'Minggu ke-WW, yyyy',
          month: 'yyyy-MM',
          quarter: 'Kuartal ke-q, yyyy',
          year: 'yyyy'
        },
        weeks: {
          w: '',
          w0: 'Minggu',
          w1: 'Senin',
          w2: 'Selasa',
          w3: 'Rabu',
          w4: 'Kamis',
          w5: 'Jumat',
          w6: 'Sabtu'
        },
        months: {
          m0: 'Januari',
          m1: 'Februari',
          m2: 'Maret',
          m3: 'April',
          m4: 'Mei',
          m5: 'Juni',
          m6: 'Juli',
          m7: 'Agustus',
          m8: 'September',
          m9: 'Oktober',
          m10: 'November',
          m11: 'Desember'
        },
        quarters: {
          q1: 'Kuartal 1',
          q2: 'Kuartal 2',
          q3: 'Kuartal 3',
          q4: 'Kuartal 4'
        }
      }
    },
    calendar: {
      yearLabel: '{0}',
      monthLabel: '{0}'
    },
    cascader: {
      clearChecked: 'Hapus',
      allChecked: 'Pilih semua',
      total: '{0} item dipilih',
      close: 'Tutup',
      search: 'Cari'
    },
    numberInput: {
      currencySymbol: 'Rp'
    },
    imagePreview: {
      popupTitle: 'Pratinjau',
      operBtn: {
        zoomOut: 'Perkecil',
        zoomIn: 'Perbesar',
        pctFull: 'Sesuaikan ke halaman',
        pct11: 'Tampilkan ukuran asli',
        rotateLeft: 'Putar ke kiri',
        rotateRight: 'Putar ke kanan',
        print: 'Klik untuk mencetak gambar',
        download: 'Klik untuk mengunduh gambar'
      }
    },
    upload: {
      fileBtnText: 'Klik atau seret untuk mengunggah',
      imgBtnText: 'Klik atau seret untuk mengunggah',
      dragPlaceholder: 'Seret file ke area ini untuk mengunggah',
      imgSizeHint: 'Satu gambar {0}',
      imgCountHint: 'Maksimal {0} gambar',
      fileTypeHint: 'Mendukung tipe file {0}',
      fileSizeHint: 'Ukuran file tunggal tidak melebihi {0}',
      fileCountHint: 'Maksimal mengunggah {0} file',
      uploadTypeErr: 'Tipe file tidak cocok!',
      overCountErr: 'Maksimal hanya dapat memilih {0} file!',
      overCountExtraErr: 'Melebihi jumlah maksimum {0}, {1} file berlebih akan diabaikan!',
      overSizeErr: 'Ukuran file maksimum tidak boleh melebihi {0}!',
      manualUpload: 'Klik untuk mengunggah',
      reUpload: 'Unggah ulang',
      uploadProgress: 'Mengunggah {0}%',
      uploadErr: 'Gagal mengunggah',
      uploadSuccess: 'Berhasil mengunggah',
      moreBtnText: 'Lainnya ({0})',
      moreImgBtnText: 'Gambar ({0})',
      moreFileBtnText: 'File ({0})',
      viewItemTitle: 'Klik untuk melihat',
      morePopup: {
        readTitle: 'Lihat daftar',
        imageTitle: 'Unggah gambar',
        fileTitle: 'Unggah file'
      }
    },
    empty: {
      defText: 'Tidak ada data'
    },
    colorPicker: {
      clear: 'Hapus',
      confirm: 'Konfirmasi',
      copySuccess: 'Disalin ke clipboard: {0}',
      hex: 'Hex'
    },
    formDesign: {
      formName: 'Nama formulir',
      defFormTitle: 'Formulir tanpa judul',
      widgetPropTab: 'Properti widget',
      widgetFormTab: 'Properti formulir',
      error: {
        wdFormUni: 'Widget jenis ini hanya dapat ditambahkan satu kali dalam formulir',
        wdSubUni: 'Widget jenis ini hanya dapat ditambahkan satu kali dalam subtabel'
      },
      styleSetting: {
        btn: 'Pengaturan gaya',
        title: 'Pengaturan gaya formulir',
        layoutTitle: 'Tata letak widget',
        verticalLayout: 'Tata letak vertikal',
        horizontalLayout: 'Tata letak horizontal',
        styleTitle: 'Gaya judul',
        boldTitle: 'Judul tebal',
        fontBold: 'Tebal',
        fontNormal: 'Normal',
        colonTitle: 'Tampilkan titik dua',
        colonVisible: 'Tampilkan',
        colonHidden: 'Sembunyikan',
        alignTitle: 'Perataan',
        widthTitle: 'Lebar judul',
        alignLeft: 'Kiri',
        alignRight: 'Kanan',
        unitPx: 'piksel',
        unitPct: 'persen'
      },
      widget: {
        group: {
          base: 'Widget dasar',
          layout: 'Widget tata letak',
          system: 'Widget sistem',
          module: 'Widget modul',
          chart: 'Widget bagan',
          advanced: 'Widget lanjutan'
        },
        copyTitle: 'Salinan_{0}',
        component: {
          input: 'Kotak input',
          textarea: 'Area teks',
          select: 'Pilihan dropdown',
          row: 'Baris dengan beberapa kolom',
          title: 'Judul',
          text: 'Teks',
          subtable: 'Subtabel',
          VxeSwitch: 'Ya/Tidak',
          VxeInput: 'Kotak input',
          VxeNumberInput: 'Angka',
          VxeDatePicker: 'Tanggal',
          VxeTextarea: 'Area teks',
          VxeSelect: 'Pilihan dropdown',
          VxeTreeSelect: 'Pilihan pohon',
          VxeRadioGroup: 'Tombol radio',
          VxeCheckboxGroup: 'Kotak centang',
          VxeUploadFile: 'File',
          VxeUploadImage: 'Gambar',
          VxeRate: 'Rating',
          VxeSlider: 'Slider'
        },
        row: {
          placeholder: 'Posisi widget'
        }
      },
      widgetProp: {
        name: 'Nama widget',
        placeholder: 'Placeholder',
        required: 'Validasi wajib',
        multiple: 'Izinkan pilihan ganda',
        displaySetting: {
          name: 'Pengaturan tampilan',
          pc: 'Desktop',
          mobile: 'Seluler',
          visible: 'Tampilkan',
          hidden: 'Sembunyikan'
        },
        dataSource: {
          name: 'Sumber data',
          defValue: 'Opsi {0}',
          addOption: 'Tambah opsi',
          batchEditOption: 'Edit massal',
          batchEditTip: 'Setiap baris sesuai dengan satu opsi, mendukung salin tempel langsung dari tabel, Excel, WPS.',
          batchEditSubTip: 'Setiap baris sesuai dengan satu opsi, jika grup, sub-item dapat dimulai dengan spasi atau tab, mendukung salin tempel langsung dari tabel, Excel, WPS.',
          buildOption: 'Hasilkan opsi'
        },
        rowProp: {
          colSize: 'Jumlah kolom',
          col2: 'Dua kolom',
          col3: 'Tiga kolom',
          col4: 'Empat kolom',
          col6: 'Enam kolom',
          layout: 'Tata letak'
        },
        textProp: {
          name: 'Konten',
          alignTitle: 'Perataan',
          alignLeft: 'Kiri',
          alignCenter: 'Tengah',
          alignRight: 'Kanan',
          colorTitle: 'Warna font',
          sizeTitle: 'Ukuran font',
          boldTitle: 'Font tebal',
          fontNormal: 'Normal',
          fontBold: 'Tebal'
        },
        subtableProp: {
          seqTitle: 'No.',
          showSeq: 'Tampilkan nomor',
          showCheckbox: 'Izinkan pilihan ganda',
          errSubDrag: 'Subtabel tidak mendukung widget ini, gunakan widget lain',
          colPlace: 'Seret widget ke sini'
        },
        uploadProp: {
          limitFileCount: 'Batas jumlah file',
          limitFileSize: 'Batas ukuran file',
          multiFile: 'Izinkan unggah beberapa file',
          limitImgCount: 'Batas jumlah gambar',
          limitImgSize: 'Batas ukuran gambar',
          multiImg: 'Izinkan unggah beberapa gambar'
        },
        rules: {
          required: 'Field wajib'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Pengaturan field',
      listSettingTab: 'Pengaturan parameter',
      searchTitle: 'Kondisi pencarian',
      listTitle: 'Field daftar',
      searchField: 'Field pencarian',
      listField: 'Field daftar',
      activeBtn: {
        ActionButtonUpdate: 'Edit',
        ActionButtonDelete: 'Hapus'
      },
      search: {
        addBtn: 'Edit',
        emptyText: 'Kondisi pencarian belum dikonfigurasi',
        editPopupTitle: 'Edit field pencarian'
      },
      searchPopup: {
        colTitle: 'Judul',
        saveBtn: 'Simpan'
      }
    },
    text: {
      copySuccess: 'Disalin ke clipboard',
      copyError: 'Lingkungan saat ini tidak mendukung operasi ini'
    },
    countdown: {
      formats: {
        yyyy: 'tahun',
        MM: 'bulan',
        dd: 'hari',
        HH: 'jam',
        mm: 'menit',
        ss: 'detik'
      }
    },
    contextMenu: {
      loadingText: 'Memuat...'
    },
    switch: {
      onText: 'Aktif',
      offText: 'Nonaktif'
    },
    gantt: {
      tFullFormat: {
        year: '{yyyy}',
        quarter: 'Kuartal {q} {yyyy}',
        month: '{MM}/{yyyy}',
        week: 'Minggu ke-{W} {yyyy}',
        day: '{eLabel}, {dd}/{MM}/{yyyy}',
        date: '{dd}/{MM}/{yyyy}',
        hour: '{dd}/{MM}/{yyyy} {HH}:00',
        minute: '{dd}/{MM}/{yyyy} {HH}:{mm}',
        second: '{dd}/{MM}/{yyyy} {HH}:{mm}:{ss}'
      },
      tSimpleFormat: {
        year: '{yyyy}',
        quarter: 'K{q}',
        month: '{M}',
        week: 'M{W}',
        day: '{eLabel}',
        date: '{d}',
        hour: '{HH}',
        minute: '{mm}',
        second: '{ss}'
      },
      stepFormat: {
        year: '{start.yyyy}~{end.yyyy}',
        quarter: 'K{start.q}~K{end.q}',
        month: '{start.M}~{end.M}',
        week: 'M{start.W}~M{end.W}',
        day: '{eStartLabel}~{eEndLabel}',
        date: '{start.d}~{end.d}',
        hour: '{start.HH}~{end.HH}',
        minute: '{start.mm}~{end.mm}',
        second: '{start.ss}~{end.ss}'
      },
      dayss: {
        w0: 'Min',
        w1: 'Sen',
        w2: 'Sel',
        w3: 'Rab',
        w4: 'Kam',
        w5: 'Jum',
        w6: 'Sab'
      },
      days: {
        w0: 'Min',
        w1: 'Sen',
        w2: 'Sel',
        w3: 'Rab',
        w4: 'Kam',
        w5: 'Jum',
        w6: 'Sab'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: 'Operasi ini tidak dapat dilakukan pada sel yang digabung',
          multiErr: 'Operasi ini tidak dapat dilakukan pada area pilihan ganda',
          selectErr: 'Tidak dapat mengoperasikan sel di area yang ditentukan',
          extendErr: 'Untuk melakukan operasi ini, semua sel yang digabung harus berukuran sama',
          pasteMultiErr: 'Tidak dapat menempel, area salin dan area tempel harus berukuran sama untuk melakukan operasi ini',
          cpInvalidErr: 'Operasi tidak dapat dilakukan, area yang Anda pilih berisi kolom terlarang ({0})'
        },
        fnr: {
          title: 'Cari dan ganti',
          titleFd: 'Cari',
          titleRe: 'Ganti',
          findLabel: 'Cari',
          replaceLabel: 'Ganti',
          findTitle: 'Cari:',
          replaceTitle: 'Ganti dengan:',
          tabs: {
            find: 'Cari',
            replace: 'Ganti'
          },
          filter: {
            re: 'Ekspresi reguler',
            whole: 'Cocokkan seluruh kata',
            sensitive: 'Peka huruf besar/kecil'
          },
          btns: {
            findNext: 'Cari berikutnya',
            findAll: 'Cari semua',
            replace: 'Ganti',
            replaceAll: 'Ganti semua',
            cancel: 'Batal'
          },
          header: {
            seq: '#',
            cell: 'Sel',
            value: 'Nilai'
          },
          body: {
            row: 'Baris: {0}',
            col: 'Kolom: {0}'
          },
          empty: '(kosong)',
          reError: 'Ekspresi reguler tidak valid',
          recordCount: 'Ditemukan {0} sel',
          notCell: 'Tidak ada sel yang cocok',
          replaceSuccess: 'Berhasil mengganti {0} sel'
        }
      },
      extendPivotTable: {
        aggregation: {
          grouping: 'Pengelompokan',
          values: 'Nilai',
          groupPlaceholder: 'Seret ke sini untuk mengelompokkan',
          valuesPlaceholder: 'Seret ke sini untuk agregasi',
          dragExistCol: 'Kolom ini sudah ada',
          sortHelpTip: 'Klik ikon untuk mulai menyeret'
        },
        aggFuncs: {
          sum: 'Jumlah',
          count: 'Hitung',
          avg: 'Rata-rata',
          min: 'Min',
          max: 'Maks',
          first: 'Nilai pertama',
          last: 'Nilai terakhir'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: 'Kolom tetap',
          fixedGroup: 'Grup tetap',
          cancelFixed: 'Batalkan tetap',
          fixedLeft: 'Tetap kiri',
          fixedRight: 'Tetap kanan'
        },
        cases: {
          equal: 'Sama dengan',
          gt: 'Lebih besar dari',
          lt: 'Lebih kecil dari',
          begin: 'Diawali dengan',
          endin: 'Diakhiri dengan',
          include: 'Berisi',
          isSensitive: 'Peka huruf besar/kecil'
        }
      },
      filterCombination: {
        menus: {
          sort: 'Urutkan',
          clearSort: 'Hapus urutan',
          sortAsc: 'Naik',
          sortDesc: 'Turun',
          fixedColumn: 'Kolom tetap',
          fixedGroup: 'Grup tetap',
          cancelFixed: 'Batalkan tetap',
          fixedLeft: 'Tetap kiri',
          fixedRight: 'Tetap kanan',
          clearFilter: 'Hapus filter',
          textOption: 'Filter teks',
          numberOption: 'Filter angka',
          dateOption: 'Filter tanggal'
        },
        popup: {
          title: 'Cara filter kustom',
          currColumnTitle: 'Tampilkan baris:',
          and: 'Dan',
          or: 'Atau',
          describeHtml: 'Gunakan ? untuk satu karakter<br/>Gunakan * untuk sejumlah karakter'
        },
        cases: {
          equal: 'Sama dengan',
          unequal: 'Tidak sama dengan',
          gt: 'Lebih besar dari',
          ge: 'Lebih besar atau sama dengan',
          lt: 'Lebih kecil dari',
          le: 'Lebih kecil atau sama dengan',
          begin: 'Diawali dengan',
          notbegin: 'Tidak diawali dengan',
          endin: 'Diakhiri dengan',
          notendin: 'Tidak diakhiri dengan',
          include: 'Berisi',
          exclude: 'Tidak berisi',
          between: 'Antara',
          isAfter: 'Setelah tanggal',
          eqAfter: 'Pada atau setelah tanggal',
          isBefore: 'Sebelum tanggal',
          eqBefore: 'Pada atau sebelum tanggal',
          top10: '10 teratas',
          aboveAverage: 'Di atas rata-rata',
          belowAverage: 'Di bawah rata-rata',
          before: 'Sebelum',
          after: 'Setelah',
          tomorrow: 'Besok',
          today: 'Hari ini',
          yesterday: 'Kemarin',
          nextWeek: 'Minggu depan',
          thisWeek: 'Minggu ini',
          lastWeek: 'Minggu lalu',
          nextMonth: 'Bulan depan',
          thisMonth: 'Bulan ini',
          lastMonth: 'Bulan lalu',
          nextYear: 'Tahun depan',
          thisYear: 'Tahun ini',
          lastYear: 'Tahun lalu',
          yearToDate: 'Sejak awal tahun hingga sekarang',
          custom: 'Filter kustom',
          insensitive: 'Tidak peka huruf besar/kecil',
          isSensitive: 'Peka huruf besar/kecil'
        },
        empty: '(kosong)',
        notData: 'Tidak ada kecocokan'
      }
    },
    pro: {
      area: {
        mergeErr: 'Operasi ini tidak dapat dilakukan pada sel yang digabung',
        multiErr: 'Operasi ini tidak dapat dilakukan pada area pilihan ganda',
        extendErr: 'Untuk melakukan operasi ini, semua sel yang digabung harus berukuran sama',
        pasteMultiErr: 'Tidak dapat menempel, area salin dan area tempel harus berukuran sama untuk melakukan operasi ini'
      },
      fnr: {
        title: 'Cari dan ganti',
        titleFd: 'Cari',
        titleRe: 'Ganti',
        findLabel: 'Cari',
        replaceLabel: 'Ganti',
        findTitle: 'Cari:',
        replaceTitle: 'Ganti dengan:',
        tabs: {
          find: 'Cari',
          replace: 'Ganti'
        },
        filter: {
          re: 'Ekspresi reguler',
          whole: 'Cocokkan seluruh kata',
          sensitive: 'Peka huruf besar/kecil'
        },
        btns: {
          findNext: 'Cari berikutnya',
          findAll: 'Cari semua',
          replace: 'Ganti',
          replaceAll: 'Ganti semua',
          cancel: 'Batal'
        },
        header: {
          seq: '#',
          cell: 'Sel',
          value: 'Nilai'
        },
        empty: '(kosong)',
        reError: 'Ekspresi reguler tidak valid',
        recordCount: 'Ditemukan {0} sel',
        notCell: 'Tidak ada sel yang cocok',
        replaceSuccess: 'Berhasil mengganti {0} sel'
      }
    },
    renderer: {
      search: 'Cari',
      cases: {
        equal: 'Sama dengan',
        unequal: 'Tidak sama dengan',
        gt: 'Lebih besar dari',
        ge: 'Lebih besar atau sama dengan',
        lt: 'Lebih kecil dari',
        le: 'Lebih kecil atau sama dengan',
        begin: 'Diawali dengan',
        notbegin: 'Tidak diawali dengan',
        endin: 'Diakhiri dengan',
        notendin: 'Tidak diakhiri dengan',
        include: 'Berisi',
        exclude: 'Tidak berisi',
        between: 'Antara',
        top10: '10 teratas',
        aboveAverage: 'Di atas rata-rata',
        belowAverage: 'Di bawah rata-rata',
        custom: 'Filter kustom',
        insensitive: 'Tidak peka huruf besar/kecil',
        isSensitive: 'Peka huruf besar/kecil'
      },
      combination: {
        menus: {
          sort: 'Urutkan',
          clearSort: 'Hapus urutan',
          sortAsc: 'Naik',
          sortDesc: 'Turun',
          fixedColumn: 'Kolom tetap',
          fixedGroup: 'Grup tetap',
          cancelFixed: 'Batalkan tetap',
          fixedLeft: 'Tetap kiri',
          fixedRight: 'Tetap kanan',
          clearFilter: 'Hapus filter',
          textOption: 'Filter teks',
          numberOption: 'Filter angka',
          dateOption: 'Filter tanggal'
        },
        popup: {
          title: 'Cara filter kustom',
          currColumnTitle: 'Tampilkan baris:',
          and: 'Dan',
          or: 'Atau',
          describeHtml: 'Gunakan ? untuk satu karakter<br/>Gunakan * untuk sejumlah karakter'
        },
        empty: '(kosong)',
        notData: 'Tidak ada kecocokan'
      }
    }
  }
}
