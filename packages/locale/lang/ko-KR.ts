export default {
  vxe: {
    base: {
      pleaseInput: '입력하십시오',
      pleaseSelect: '선택하십시오',
      comma: '，',
      fullStop: '。'
    },
    loading: {
      text: '로딩 ...'
    },
    error: {
      downErr: '다운로드 실패',
      errLargeData: '바인딩 데이터의 양이 너무 큰 경우 {0}을 사용하십시오. 그렇지 않으면 지연이 발생할 수 있습니다.',
      groupFixed: '그룹화 된 헤더를 사용하는 경우 동결 된 열은 그룹별로 설정해야합니다.',
      groupMouseRange: '그룹화 헤더는 "{0}"과 동시에 사용할 수 없으며 오류가 발생할 수 있습니다.',
      groupTag: '열 헤더 그룹화는 "{1}"대신 "{0}"을 사용해야하며 오류가 발생할 수 있습니다.',
      scrollErrProp: '이 매개 변수 "{0}"은 가상 스크롤링이 활성화 된 후에 지원되지 않습니다.',
      errConflicts: '매개 변수 "{0}" "{1}"과 충돌합니다.',
      modelConflicts: '绑定的字段值 "{0}" 与 "{1}" 存在冲突，将会出现错误',
      notSupportProp: '"{1}"은 "{0}"매개 변수가 활성화 될 때 지원되지 않습니다. "{2}"이어야합니다. 그렇지 않으면 오류가 발생합니다.',
      notConflictProp: '"{0}"을 사용하는 경우 "{1}"을 설정해야합니다. 그렇지 않으면 기능적 충돌이있을 수 있습니다.',
      unableInsert: '지정된 위치에 삽입 할 수 없으므로 매개 변수가 올바른지 확인하십시오.',
      useErr: '"{0}"모듈을 설치하는 동안 오류가 발생했습니다. 주문이 잘못 될 수 있습니다. 종속 모듈은 테이블 전에 설치해야합니다',
      barUnableLink: '툴바는 테이블을 연결할 수 없습니다',
      expandContent: '확장 라인의 슬롯은 "콘텐츠"여야합니다. 올바른지 확인하십시오.',
      reqComp: '"{0}"구성 요소가 누락되었습니다. 올바르게 설치되었는지 확인하십시오. https://vxeui.com/#/start/useglobal',
      reqModule: '"{0}"모듈 누락',
      reqProp: '필요한 "{0}"매개 변수가 누락되어 오류가 발생할 수 있습니다.',
      emptyProp: '매개 변수 "{0}"은 비어 있지 않습니다',
      errProp: '지원되지 않는 매개 변수 "{0}", 아마도 "{1}"',
      colRepet: '열. {0} = "{1}"이 반복되어 일부 기능이 사용할 수 없게 될 수 있습니다.',
      notFunc: '메소드 "{0}"는 존재하지 않습니다',
      errFunc: '매개 변수 "{0}"은 메소드가 아닙니다',
      notValidators: '글로벌 검증 "{0}"은 존재하지 않습니다',
      notFormats: '글로벌 서식 "{0}"은 존재하지 않습니다',
      notCommands: '글로벌 지시문 "{0}"은 존재하지 않습니다',
      notSlot: '슬롯 "{0}"은 존재하지 않습니다',
      noTree: '"{0}"은 트리 구조에서 지원되지 않습니다',
      noGroup: '数据分组后不支持 "{0}"',
      notProp: '지원되지 않는 매개 변수 "{0}"',
      checkProp: '데이터 볼륨이 너무 커지면 확인란이 말더듬 될 수 있습니다. 렌더링 속도를 향상시키기 위해 매개 변수 "{0}"를 설정하는 것이 좋습니다.',
      coverProp: '"{0}"의 매개 변수 "{1}"이 반복적으로 정의되어 오류가 발생할 수 있습니다.',
      uniField: '필드 이름 "{0}"은 반복적으로 정의되어 오류가 발생할 수 있습니다.',
      repeatKey: '기본 키 {0} = "{1}"을 반복하여 오류가 발생할 수 있습니다.',
      delFunc: '메소드 "{0}"는 더 이상 사용되지 않습니다. "{1}"을 사용하십시오.',
      delProp: '매개 변수 "{0}"은 더 이상 사용되지 않습니다. "{1}"을 사용하십시오.',
      delEvent: '이벤트 "{0}"는 더 이상 사용되지 않습니다. "{1}"을 사용하십시오.',
      removeProp: '매개 변수 "{0}"은 더 이상 사용되지 않고 권장되지 않으므로 오류가 발생할 수 있습니다.',
      errFormat: '글로벌 형식의 컨텐츠는 "vxetable.formats"를 사용하여 정의해야하며 "Formatter = {0}"장착 방법은 더 이상 권장되지 않습니다.',
      notType: '지원되지 않는 파일 유형 "{0}"',
      notExp: '이 브라우저는 가져 오기/내보내기 기능을 지원하지 않습니다',
      impFields: '수입이 실패했습니다. 필드 이름과 데이터 형식이 올바른지 확인하십시오.',
      treeNotImp: '트리 테이블은 가져 오기를 지원하지 않습니다',
      treeCrossDrag: '첫 번째 레벨 만 드래그하십시오',
      treeDragChild: '부모는 자신의 자녀에게 끌 수 없습니다',
      reqPlugin: '"{1}"은 https://vxeui.com/other {0 }/#/1 }/install에 설치되지 않았습니다',
      errMaxRow: '최대 지원되는 데이터 볼륨 {0} 행을 초과하면 오류가 발생할 수 있습니다.',
      useNew: '{0} 已经不建议使用，请使用新的方式 {1}'
    },
    table: {
      emptyText: '아직 데이터가 없습니다',
      allTitle: 'ALL/CANCEL을 선택하십시오',
      seqTitle: '일련 번호',
      actionTitle: '작동하다',
      confirmFilter: '필터',
      resetFilter: '다시 놓기',
      allFilter: '모두',
      sortAsc: '오름차순 순서 : 가장 낮거나 가장 높음',
      sortDesc: '하강 순서 : 가장 높거나 가장 낮습니다',
      filter: '선택한 열에 대한 필터링을 활성화합니다',
      impSuccess: '성공적으로 가져온 {0} 레코드',
      expLoading: '수출',
      expSuccess: '성공적으로 내보내십시오',
      expError: '내보내기 실패',
      expFilename: 'Export_ {0}',
      expOriginFilename: 'Export_Source_ {0}',
      customTitle: '열 설정',
      customAll: '모두',
      customConfirm: '확인하다',
      customClose: '폐쇄',
      customCancel: '취소',
      customRestore: '기본값을 복원하십시오',
      maxFixedCol: '냉동 열의 최대 수는 {0}을 초과 할 수 없습니다.',
      maxGroupCol: '最大分组字段的数量不能超过 {0} 个',
      dragTip: '움직임 : {0}',
      resizeColTip: '너비 : {0} 픽셀',
      resizeRowTip: '높이 : {0} 픽셀',
      rowGroupContentTotal: '{0} ({1})'
    },
    grid: {
      selectOneRecord: '하나 이상의 레코드를 선택하십시오!',
      deleteSelectRecord: '선택한 레코드를 삭제 하시겠습니까?',
      removeSelectRecord: '선택한 레코드를 제거 하시겠습니까?',
      dataUnchanged: '데이터가 변경되지 않았습니다!',
      delSuccess: '선택된 레코드가 성공적으로 삭제되었습니다!',
      saveSuccess: '성공적으로 저장하십시오!',
      operError: '오류가 발생했고 작업이 실패했습니다!'
    },
    select: {
      clear: '清除',
      allChecked: '全选',
      total: '{0} / {1}',
      search: '찾다',
      loadingText: '로딩',
      emptyText: '아직 데이터가 없습니다',
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
      goto: '가다',
      gotoTitle: '페이지 수',
      pagesize: '{0} 항목/페이지',
      total: '총 {0} 레코드',
      pageClassifier: '페이지',
      homePage: '첫 페이지',
      homePageTitle: '첫 페이지',
      prevPage: '이전 페이지',
      prevPageTitle: '이전 페이지',
      nextPage: '다음 페이지',
      nextPageTitle: '다음 페이지',
      prevJump: '페이지를 뛰어 넘으십시오',
      prevJumpTitle: '페이지를 뛰어 넘으십시오',
      nextJump: '아래로 이동하십시오',
      nextJumpTitle: '아래로 이동하십시오',
      endPage: '마지막 페이지',
      endPageTitle: '마지막 페이지'
    },
    alert: {
      title: '시스템 프롬프트'
    },
    button: {
      confirm: '확인하다',
      cancel: '취소',
      clear: '분명한'
    },
    filter: {
      search: '찾다'
    },
    custom: {
      cstmTitle: '열 설정',
      cstmRestore: '기본값을 복원하십시오',
      cstmCancel: '취소',
      cstmConfirm: '확신하는',
      cstmConfirmRestore: '기본 열 구성으로 복원되었는지 확인하십시오.',
      cstmDragTarget: '움직임 : {0}',
      setting: {
        colSort: '종류',
        sortHelpTip: '点击并拖动图标可以调整顺序',
        colTitle: '열 제목',
        colResizable: '열 폭 (픽셀)',
        colVisible: '표시 여부',
        colFixed: '동결 열',
        colFixedMax: '냉동 열 (최대 {0} 열)',
        fixedLeft: '왼쪽',
        fixedUnset: '설정되지 않았습니다',
        fixedRight: '오른쪽'
      }
    },
    import: {
      modes: {
        covering: '메소드를 덮어 쓰기 (테이블 데이터를 직접 덮어 쓰기)',
        insert: '하단에 추가 (테이블 하단에 새 데이터를 추가하십시오)',
        insertTop: '상단에 추가 (테이블 상단에 새 데이터를 추가하십시오)',
        insertBottom: '하단에 추가 (테이블 하단에 새 데이터를 추가하십시오)'
      },
      impTitle: '수입 데이터',
      impFile: '파일 이름',
      impSelect: '파일을 선택하십시오',
      impType: '파일 유형',
      impOpts: '매개 변수 설정',
      impMode: '가져 오기 모드',
      impConfirm: '수입',
      impCancel: '취소'
    },
    export: {
      types: {
        csv: 'CSV (쉼표 분리) (*. CSV)',
        html: '웹 페이지 (*.html)',
        xml: 'XML 데이터 (*.xml)',
        txt: '텍스트 파일 (탭 분리) (*. txt)',
        xls: 'Excel 97-2003 통합 문서 (*.xls)',
        xlsx: 'Excel 통합 문서 (*.xlsx)',
        pdf: 'pdf (*.pdf)'
      },
      modes: {
        empty: '빈 데이터',
        current: '현재 데이터 (현재 페이지의 데이터)',
        selected: '선택된 데이터 (현재 페이지에서 선택된 데이터)',
        all: '전체 데이터 (모든 PAGED 데이터 포함)'
      },
      printTitle: '인쇄 데이터',
      expTitle: '내보내기 데이터',
      expName: '파일 이름',
      expNamePlaceholder: '파일 이름을 입력하십시오',
      expSheetName: '제목',
      expSheetNamePlaceholder: '제목을 입력하십시오',
      expType: '유형을 저장하십시오',
      expMode: '데이터를 선택하십시오',
      expCurrentColumn: '모든 필드',
      expColumn: '필드를 선택하십시오',
      expOpts: '매개 변수 설정',
      expOptHeader: '헤더',
      expHeaderTitle: '테이블 헤더가 필요합니다',
      expOptFooter: '테이블 끝',
      expFooterTitle: '테이블의 끝이 필요합니까?',
      expOptColgroup: '그룹화 헤더',
      expOptTitle: '열 제목',
      expTitleTitle: '열 제목이든, 그렇지 않으면 열의 필드 이름으로 표시됩니다.',
      expColgroupTitle: '존재하면 그룹화 구조가있는 헤더가 지원됩니다.',
      expOptMerge: '병합',
      expMergeTitle: '존재하는 경우, 병합 된 구조를 갖는 세포가지지된다',
      expOptAllExpand: '나무를 확장하십시오',
      expAllExpandTitle: '존재하는 경우 계층 구조로 모든 데이터를 확장하도록 지원됩니다.',
      expOptUseStyle: '스타일',
      expUseStyleTitle: '존재하는 경우 스타일이있는 셀이 지원됩니다',
      expOptOriginal: '소스 데이터',
      expOriginalTitle: '소스 데이터 인 경우 테이블로 가져 오는 것이 지원됩니다.',
      expPrint: '인쇄',
      expConfirm: '내보내다',
      expCancel: '취소'
    },
    modal: {
      errTitle: '오류 메시지',
      zoomMin: '최소화하십시오',
      zoomIn: '최대화',
      zoomOut: '절감',
      close: '폐쇄',
      miniMaxSize: '최소화 된 창의 수는 {0}을 초과 할 수 없습니다.',
      footPropErr: 'Show-Footer는 테이블 꼬리를 활성화하는 데만 사용되며 Show-Confirm-Button | 쇼 캔셀 버튼 | 슬롯'
    },
    drawer: {
      close: '폐쇄'
    },
    form: {
      folding: '닫다',
      unfolding: '확장하다'
    },
    toolbar: {
      import: '수입',
      export: '내보내다',
      print: '인쇄',
      refresh: '새로 고치다',
      zoomIn: '전체 화면',
      zoomOut: '절감',
      custom: '열 설정',
      customAll: '모두',
      customConfirm: '확인하다',
      customRestore: '다시 놓기',
      fixedLeft: '왼쪽으로 동결',
      fixedRight: '오른쪽 정지',
      cancelFixed: '녹이다'
    },
    datePicker: {
      yearTitle: '{0} 년'
    },
    dateRangePicker: {
      pleaseRange: '请选择开始日期与结束日期'
    },
    input: {
      date: {
        m1: '1월',
        m2: '2월',
        m3: '3월',
        m4: '4월',
        m5: '5월',
        m6: '6월',
        m7: '칠월',
        m8: '팔월',
        m9: '구월',
        m10: '십월',
        m11: '십일월',
        m12: '12월',
        quarterLabel: '{0} 년',
        monthLabel: '{0} 년',
        dayLabel: '{0} 년 {1}',
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
          w0: '일요일',
          w1: '월요일',
          w2: '화요일',
          w3: '수요일',
          w4: '목요일',
          w5: '금요일',
          w6: '토요일'
        },
        months: {
          m0: '1월',
          m1: '2월',
          m2: '3월',
          m3: '4월',
          m4: '5월',
          m5: '6월',
          m6: '7월',
          m7: '8월',
          m8: '9월',
          m9: '10월',
          m10: '11월',
          m11: '12월'
        },
        quarters: {
          q1: '1 분기',
          q2: '2 분기',
          q3: '3 분기',
          q4: '4 분기'
        }
      }
    },
    numberInput: {
      currencySymbol: '$'
    },
    imagePreview: {
      popupTitle: '시사',
      operBtn: {
        zoomOut: '수축',
        zoomIn: '크게 하다',
        pctFull: '똑같이 스케일링',
        pct11: '원래 크기를 보여줍니다',
        rotateLeft: '왼쪽으로 회전하십시오',
        rotateRight: '오른쪽으로 회전하십시오',
        print: '사진을 인쇄하려면 클릭하십시오',
        download: '사진을 다운로드하려면 클릭하십시오'
      }
    },
    upload: {
      fileBtnText: '업로드하려면 클릭하거나 드래그합니다',
      imgBtnText: '업로드하려면 클릭하거나 드래그합니다',
      dragPlaceholder: '업로드하려면 파일을이 영역으로 드래그 앤 드래그하여 떨어 뜨리십시오.',
      imgSizeHint: '전단지 {0}',
      imgCountHint: '최대 {0} 그림',
      fileTypeHint: '지원 {0} 파일 유형',
      fileSizeHint: '단일 파일 크기가 {0}을 초과하지 않습니다.',
      fileCountHint: '최대 {0} 파일을 업로드 할 수 있습니다',
      uploadTypeErr: '파일 유형 불일치!',
      overCountErr: '{0} 파일 만 최대 선택할 수 있습니다!',
      overCountExtraErr: '{0}의 최대 수가 초과되었고 초과 {1} 파일은 무시됩니다!',
      overSizeErr: '최대 파일 크기는 {0}을 초과 할 수 없습니다!',
      manualUpload: '点击上传',
      reUpload: '재 포장',
      uploadProgress: '업로드 {0}%',
      uploadErr: '업로드 실패',
      uploadSuccess: '성공적으로 업로드하십시오',
      moreBtnText: 'more ({0})',
      viewItemTitle: '보려면 클릭하십시오',
      morePopup: {
        readTitle: '목록보기',
        imageTitle: '사진 업로드',
        fileTitle: '파일 업로드'
      }
    },
    empty: {
      defText: '아직 데이터가 없습니다'
    },
    colorPicker: {
      clear: '분명한',
      confirm: '확인하다',
      copySuccess: '클립 보드로 복사 : {0}',
      hex: 'HEX'
    },
    formDesign: {
      formName: '양식 이름',
      defFormTitle: '이름이없는 양식',
      widgetPropTab: '제어 특성',
      widgetFormTab: '형태 속성',
      error: {
        wdFormUni: '이 유형의 제어는 양식에 하나만 추가 할 수 있습니다.',
        wdSubUni: '이 유형의 제어는 하위 테이블에 하나만 추가 할 수 있습니다.'
      },
      styleSetting: {
        btn: '스타일 설정',
        title: '양식 스타일 설정',
        layoutTitle: '제어 레이아웃',
        verticalLayout: '상단 및 하단 레이아웃',
        horizontalLayout: '수평 레이아웃',
        styleTitle: '제목 스타일',
        boldTitle: '제목 대담한',
        fontBold: '용감한',
        fontNormal: '전통적인',
        colonTitle: '콜론을 보여주십시오',
        colonVisible: '보여주다',
        colonHidden: '숨다',
        alignTitle: '조정',
        widthTitle: '제목 너비',
        alignLeft: '왼쪽에',
        alignRight: '오른쪽에',
        unitPx: '픽셀',
        unitPct: '백분율'
      },
      widget: {
        group: {
          base: '기본 제어',
          layout: '레이아웃 컨트롤',
          system: '시스템 제어',
          module: '모듈 컨트롤',
          chart: '차트 제어',
          advanced: '고급 컨트롤'
        },
        copyTitle: 'COPY_ {0}',
        component: {
          input: '입력 상자',
          textarea: '텍스트 필드',
          select: '아래로 당겨 선택하십시오',
          row: '하나의 행과 여러 열',
          title: '제목',
          text: '텍스트',
          subtable: '하위 테이블',
          VxeSwitch: '~이든',
          VxeInput: '입력 상자',
          VxeNumberInput: '숫자',
          VxeDatePicker: '날짜',
          VxeTextarea: '텍스트 필드',
          VxeSelect: '아래로 당겨 선택하십시오',
          VxeTreeSelect: '나무 선택',
          VxeRadioGroup: '라디오 버튼',
          VxeCheckboxGroup: '확인란',
          VxeUploadFile: '문서',
          VxeUploadImage: '그림',
          VxeRate: '점수',
          VxeSlider: '슬라이더'
        }
      },
      widgetProp: {
        name: '제어 이름',
        placeholder: '즉각적인',
        required: '필요한 검증',
        multiple: '여러 선택이 허용됩니다',
        displaySetting: {
          name: '디스플레이 설정',
          pc: 'PC',
          mobile: '이동하는',
          visible: '보여주다',
          hidden: '숨다'
        },
        dataSource: {
          name: '데이터 소스',
          defValue: '옵션 {0}',
          addOption: '옵션 추가',
          batchEditOption: '배치 편집',
          batchEditTip: '각 행은 옵션에 해당하며 테이블, Excel 및 WPS에서 직접 복사 및 붙여 넣기를 지원합니다.',
          batchEditSubTip: '각 행은 옵션에 해당합니다. 그룹 인 경우 하위 항목은 공간 또는 탭 키로 시작할 수 있으며 테이블, Excel 및 WPS에서 직접 복사 및 붙여 넣기를 지원합니다.',
          buildOption: '옵션 빌드'
        },
        rowProp: {
          colSize: '열 수',
          col2: '두 열',
          col3: '세 열',
          col4: '4 개의 열',
          col6: '6 개의 열',
          layout: '공들여 나열한 것'
        },
        textProp: {
          name: '콘텐츠',
          alignTitle: '조정',
          alignLeft: '왼쪽에',
          alignCenter: '센터',
          alignRight: '오른쪽에',
          colorTitle: '글꼴 색상',
          sizeTitle: '글꼴 크기',
          boldTitle: '대담한 글꼴',
          fontNormal: '전통적인',
          fontBold: '용감한'
        },
        subtableProp: {
          seqTitle: '일련 번호',
          showSeq: '일련 번호를 표시하십시오',
          showCheckbox: '여러 선택이 허용됩니다',
          errSubDrag: '하위 테이블은이 컨트롤을 지원하지 않으며 다른 컨트롤을 사용하십시오.',
          colPlace: '제어를 드래그하십시오'
        },
        uploadProp: {
          limitFileCount: '파일 수량 제한',
          limitFileSize: '파일 크기 제한',
          multiFile: '여러 파일을 업로드 할 수 있습니다',
          limitImgCount: '사진의 수를 제한합니다',
          limitImgSize: '이미지 크기 제한',
          multiImg: '여러 사진을 업로드 할 수 있습니다'
        }
      }
    },
    listDesign: {
      fieldSettingTab: '현장 설정',
      listSettingTab: '매개 변수 설정',
      searchTitle: '쿼리 기준',
      listTitle: '목록 필드',
      searchField: '쿼리 필드',
      listField: '목록 필드',
      activeBtn: {
        ActionButtonUpdate: '편집하다',
        ActionButtonDelete: '삭제'
      },
      search: {
        addBtn: '편집하다',
        emptyText: '쿼리 조건이 구성되지 않았습니다',
        editPopupTitle: '쿼리 필드 편집'
      },
      searchPopup: {
        colTitle: '제목',
        saveBtn: '구하다'
      }
    },
    text: {
      copySuccess: '클립 보드에 복사',
      copyError: '현재 환경은이 작업을 지원하지 않습니다'
    },
    countdown: {
      formats: {
        yyyy: '년',
        MM: '월',
        dd: '일',
        HH: '시',
        mm: '분',
        ss: '초'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: '이 작업은 병합 된 셀에서 수행 할 수 없습니다',
          multiErr: '이 작업은 여러 선택 영역에서 수행 할 수 없습니다',
          selectErr: '지정된 범위의 셀에서 작동 할 수 없습니다',
          extendErr: '확장 범위에 병합 된 셀이 포함 된 경우 모든 병합 된 셀이 같은 크기 여야합니다.',
          pasteMultiErr: '붙여 넣을 수 없으면이 작업을 수행하려면 복사 및 붙여 넣은 영역이 동일한 크기 여야합니다.',
          cpInvalidErr: '작업을 수행 할 수 없습니다. 선택한 범위에는 금지 된 열 ({0})이 있습니다.'
        },
        fnr: {
          title: '찾아 교체하십시오',
          findLabel: '찾다',
          replaceLabel: '바꾸다',
          findTitle: '찾기 :',
          replaceTitle: '대체 : :',
          tabs: {
            find: '찾다',
            replace: '바꾸다'
          },
          filter: {
            re: '정규 표현',
            whole: '전체 단어 일치',
            sensitive: '사례에 민감합니다'
          },
          btns: {
            findNext: '다음을 찾으십시오',
            findAll: '모두 찾으십시오',
            replace: '바꾸다',
            replaceAll: '모두 교체하십시오',
            cancel: '취소'
          },
          header: {
            seq: '#',
            cell: '셀',
            value: '값'
          },
          body: {
            row: '행 : {0}',
            col: '열 : {0}'
          },
          empty: '(널 값)',
          reError: '잘못된 정규 표현',
          recordCount: '{0} 세포가 발견되었습니다',
          notCell: '일치하는 셀을 찾을 수 없습니다',
          replaceSuccess: '{0} 세포를 성공적으로 대체했습니다'
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
          fixedColumn: '동결 열',
          fixedGroup: '동결 그룹',
          cancelFixed: '녹이다',
          fixedLeft: '왼쪽으로 동결',
          fixedRight: '오른쪽 정지'
        },
        cases: {
          equal: '동일한',
          gt: '더 큽니다',
          lt: '보다 적습니다',
          begin: '시작은',
          endin: '끝은',
          include: '포함하다',
          isSensitive: '사례에 민감합니다'
        }
      },
      filterCombination: {
        menus: {
          sort: '종류',
          clearSort: '명확한 정렬',
          sortAsc: '오름차순 순서',
          sortDesc: '하강 순서',
          fixedColumn: '동결 열',
          fixedGroup: '동결 그룹',
          cancelFixed: '녹이다',
          fixedLeft: '왼쪽으로 동결',
          fixedRight: '오른쪽 정지',
          clearFilter: '클리어 필터',
          textOption: '텍스트 필터',
          numberOption: '수치 필터'
        },
        popup: {
          title: '사용자 정의 필터링 방법',
          currColumnTitle: '현재 열 :',
          and: '그리고',
          or: '또는',
          describeHtml: '사용 가능? 단일 문자를 나타냅니다. <br/> use *는 여러 문자를 나타냅니다'
        },
        cases: {
          equal: '동일한',
          unequal: '동일하지 않습니다',
          gt: '더 큽니다',
          ge: '더 크거나 동일합니다',
          lt: '보다 적습니다',
          le: '보다 작거나 동일합니다',
          begin: '시작은',
          notbegin: '처음에는 없습니다',
          endin: '끝은',
          notendin: '결말은 아닙니다',
          include: '포함하다',
          exclude: '포함되지 않습니다',
          between: '사이',
          custom: '사용자 정의 필터',
          insensitive: '케이스 둔감',
          isSensitive: '사례에 민감합니다'
        },
        empty: '(공백)',
        notData: '일치하지 않습니다'
      }
    },
    pro: {
      area: {
        mergeErr: '이 작업은 병합 된 셀에서 수행 할 수 없습니다',
        multiErr: '이 작업은 여러 선택 영역에서 수행 할 수 없습니다',
        extendErr: '확장 범위에 병합 된 셀이 포함 된 경우 모든 병합 된 셀이 같은 크기 여야합니다.',
        pasteMultiErr: '붙여 넣을 수 없으면이 작업을 수행하려면 복사 및 붙여 넣은 영역이 동일한 크기 여야합니다.'
      },
      fnr: {
        title: '찾아 교체하십시오',
        findLabel: '찾다',
        replaceLabel: '바꾸다',
        findTitle: '내용 찾기 :',
        replaceTitle: '대체 : :',
        tabs: {
          find: '찾다',
          replace: '바꾸다'
        },
        filter: {
          re: '정규 표현',
          whole: '전체 단어 일치',
          sensitive: '사례에 민감합니다'
        },
        btns: {
          findNext: '다음을 찾으십시오',
          findAll: '모두 찾으십시오',
          replace: '바꾸다',
          replaceAll: '모두 교체하십시오',
          cancel: '취소'
        },
        header: {
          seq: '#',
          cell: '셀',
          value: '값'
        },
        empty: '(널 값)',
        reError: '잘못된 정규 표현',
        recordCount: '{0} 세포가 발견되었습니다',
        notCell: '일치하는 셀이 발견되지 않았습니다',
        replaceSuccess: '{0} 세포를 성공적으로 대체했습니다'
      }
    },
    renderer: {
      search: '찾다',
      cases: {
        equal: '동일한',
        unequal: '동일하지 않습니다',
        gt: '더 큽니다',
        ge: '더 크거나 동일합니다',
        lt: '보다 적습니다',
        le: '보다 작거나 동일합니다',
        begin: '시작은',
        notbegin: '처음에는 없습니다',
        endin: '끝은',
        notendin: '결말은 아닙니다',
        include: '포함하다',
        exclude: '포함되지 않습니다',
        between: '사이',
        custom: '사용자 정의 필터',
        insensitive: '케이스 둔감',
        isSensitive: '사례에 민감합니다'
      },
      combination: {
        menus: {
          sort: '종류',
          clearSort: '명확한 정렬',
          sortAsc: '오름차순 순서',
          sortDesc: '하강 순서',
          fixedColumn: '동결 열',
          fixedGroup: '동결 그룹',
          cancelFixed: '녹이다',
          fixedLeft: '왼쪽으로 동결',
          fixedRight: '오른쪽 정지',
          clearFilter: '클리어 필터',
          textOption: '텍스트 필터링',
          numberOption: '수치 필터링'
        },
        popup: {
          title: '사용자 정의 필터링 방법',
          currColumnTitle: '현재 열 :',
          and: '그리고',
          or: '또는',
          describeHtml: '사용 가능? 단일 문자를 나타냅니다. <br/> use *는 여러 문자를 나타냅니다'
        },
        empty: '(공백)',
        notData: '일치하지 않습니다'
      }
    }
  }
}
