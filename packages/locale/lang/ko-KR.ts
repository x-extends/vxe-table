export default {
  vxe: {
    base: {
      pleaseInput: '입력해주세요',
      pleaseSelect: '선택해주세요',
      comma: '，',
      fullStop: '。'
    },
    loading: {
      text: '로딩 중...'
    },
    error: {
      downErr: '다운로드 실패',
      errLargeData: '바인딩된 데이터 양이 너무 많을 경우 {0}을 사용해 주세요. 그렇지 않으면 성능 저하가 발생할 수 있습니다.',
      groupFixed: '그룹화된 테이블 헤더를 사용할 경우, 고정 열은 그룹별로 설정해야 합니다.',
      groupMouseRange: '그룹화된 테이블 헤더와 "{0}"을 동시에 사용할 수 없습니다. 오류가 발생할 수 있습니다.',
      groupTag: '그룹화된 열 헤더는 "{0}"을 사용해야 하며, "{1}"을 사용하면 오류가 발생할 수 있습니다.',
      scrollErrProp: '가상 스크롤을 활성화한 경우, 매개변수 "{0}"은 지원되지 않습니다.',
      errConflicts: '매개변수 "{0}"과(와) "{1}"은(는) 충돌합니다.',
      unableInsert: '지정된 위치에 삽입할 수 없습니다. 매개변수가 올바른지 확인하세요.',
      useErr: '"{0}" 모듈 설치 중 오류가 발생했습니다. 순서가 잘못되었을 수 있으며, 테이블 전에 종속 모듈이 설치되어야 합니다.',
      barUnableLink: '도구 모음과 테이블을 연결할 수 없습니다.',
      expandContent: '행 확장 슬롯은 "content"여야 하며, 올바른지 확인해주세요.',
      reqComp: '"{0}" 컴포넌트가 누락되었습니다. 올바르게 설치되었는지 확인해주세요. https://vxeui.com/#/start/useGlobal',
      reqModule: '"{0}" 모듈이 누락되었습니다.',
      reqProp: '"{0}" 필수 매개변수가 누락되었습니다. 오류가 발생할 수 있습니다.',
      emptyProp: '매개변수 "{0}"은(는) 비워둘 수 없습니다.',
      errProp: '지원하지 않는 매개변수 "{0}". 예상: "{1}"',
      colRepet: 'column.{0}="{1}"이(가) 중복되었습니다. 이로 인해 일부 기능이 작동하지 않을 수 있습니다.',
      notFunc: '메서드 "{0}"이(가) 존재하지 않습니다.',
      errFunc: '매개변수 "{0}"은(는) 메서드가 아닙니다.',
      notValidators: '전역 유효성 검사기 "{0}"이(가) 존재하지 않습니다.',
      notFormats: '전역 형식화 "{0}"이(가) 존재하지 않습니다.',
      notCommands: '전역 명령어 "{0}"이(가) 존재하지 않습니다.',
      notSlot: '슬롯 "{0}"이(가) 존재하지 않습니다.',
      noTree: '트리 구조에서 "{0}"을(를) 지원하지 않습니다.',
      notProp: '지원하지 않는 매개변수 "{0}"',
      checkProp: '데이터 양이 많을 경우 체크박스 렌더링이 느려질 수 있습니다. 성능을 개선하려면 매개변수 "{0}"을(를) 설정하는 것이 좋습니다.',
      coverProp: '"{0}"의 매개변수 "{1}"이(가) 중복 정의되었습니다. 오류가 발생할 수 있습니다.',
      uniField: '필드명 "{0}"이(가) 중복 정의되었습니다. 오류가 발생할 수 있습니다.',
      repeatKey: '기본 키 중복 {0}="{1}". 오류가 발생할 수 있습니다.',
      delFunc: '메서드 "{0}"은(는) 더 이상 사용되지 않습니다. 대신 "{1}"을(를) 사용하세요.',
      delProp: '매개변수 "{0}"은(는) 더 이상 사용되지 않습니다. 대신 "{1}"을(를) 사용하세요.',
      delEvent: '이벤트 "{0}"은(는) 더 이상 사용되지 않습니다. 대신 "{1}"을(를) 사용하세요.',
      removeProp: '매개변수 "{0}"은(는) 더 이상 사용되지 않으며, 사용을 권장하지 않습니다. 오류가 발생할 수 있습니다.',
      errFormat: '전역 형식화 내용은 "VXETable.formats"를 사용하여 정의해야 합니다. "formatter={0}" 방식은 더 이상 권장되지 않습니다.',
      notType: '지원하지 않는 파일 유형 "{0}"',
      notExp: '이 브라우저는 가져오기/내보내기 기능을 지원하지 않습니다.',
      impFields: '가져오기 실패. 필드명과 데이터 형식을 확인하세요.',
      treeNotImp: '트리 테이블은 가져오기를 지원하지 않습니다.',
      treeCrossDrag: '첫 번째 계층만 드래그할 수 있습니다.',
      treeDragChild: '부모 항목은 자신의 하위 항목으로 드래그할 수 없습니다.',
      reqPlugin: '선택적 확장 플러그인 "{1}" https://vxeui.com/other{0}/#/{1}/install'
    },
    table: {
      emptyText: '데이터가 없습니다.',
      allTitle: '전체 선택/취소',
      seqTitle: '번호',
      actionTitle: '작업',
      confirmFilter: '필터 적용',
      resetFilter: '필터 초기화',
      allFilter: '전체',
      sortAsc: '오름차순: 최소에서 최대',
      sortDesc: '내림차순: 최대에서 최소',
      filter: '선택한 열에 필터 적용',
      impSuccess: '{0}개의 레코드가 성공적으로 가져왔습니다.',
      expLoading: '내보내는 중입니다.',
      expSuccess: '내보내기 성공',
      expError: '내보내기 실패',
      expFilename: '{0} 내보내기',
      expOriginFilename: '원본_{0} 내보내기',
      customTitle: '열 설정',
      customAll: '전체',
      customConfirm: '확인',
      customClose: '닫기',
      customCancel: '취소',
      customRestore: '기본값으로 복원',
      maxFixedCol: '최대 고정 열 수는 {0}을(를) 초과할 수 없습니다.',
      dragTip: '이동: {0}',
      resizeColTip: '宽：{0} 像素',
      resizeRowTip: '高：{0} 像素'
    },
    grid: {
      selectOneRecord: '최소한 하나의 레코드를 선택해주세요!',
      deleteSelectRecord: '선택한 레코드를 정말로 삭제하시겠습니까?',
      removeSelectRecord: '선택한 레코드를 정말로 제거하시겠습니까?',
      dataUnchanged: '데이터가 변경되지 않았습니다!',
      delSuccess: '선택한 레코드를 성공적으로 삭제했습니다!',
      saveSuccess: '저장 성공!',
      operError: '오류 발생, 작업 실패!'
    },
    select: {
      search: '검색',
      loadingText: '로딩 중',
      emptyText: '데이터가 없습니다'
    },
    pager: {
      goto: '이동',
      gotoTitle: '페이지 번호',
      pagesize: '{0}개/페이지',
      total: '총 {0}개의 레코드',
      pageClassifier: '페이지',
      homePage: '홈페이지',
      homePageTitle: '홈페이지',
      prevPage: '이전 페이지',
      prevPageTitle: '이전 페이지',
      nextPage: '다음 페이지',
      nextPageTitle: '다음 페이지',
      prevJump: '위로 한 페이지 이동',
      prevJumpTitle: '위로 한 페이지 이동',
      nextJump: '아래로 한 페이지 이동',
      nextJumpTitle: '아래로 한 페이지 이동',
      endPage: '끝 페이지',
      endPageTitle: '끝 페이지'
    },
    alert: {
      title: '시스템 알림'
    },
    button: {
      confirm: '확인',
      cancel: '취소'
    },
    filter: {
      search: '검색'
    },
    custom: {
      cstmTitle: '열 설정',
      cstmRestore: '기본값으로 복원',
      cstmCancel: '취소',
      cstmConfirm: '확인',
      cstmConfirmRestore: '기본 열 구성을 복원하시겠습니까?',
      cstmDragTarget: '이동: {0}',
      setting: {
        colSort: '정렬',
        sortHelpTip: '아이콘을 클릭하고 드래그하여 열의 순서를 조정할 수 있습니다.',
        colTitle: '열 제목',
        colResizable: '열 너비(픽셀)',
        colVisible: '표시 여부',
        colFixed: '고정 열',
        colFixedMax: '고정 열(최대 {0} 열)',
        fixedLeft: '왼쪽',
        fixedUnset: '설정하지 않음',
        fixedRight: '오른쪽'
      }
    },
    import: {
      modes: {
        covering: '덮어쓰기(테이블 데이터를 직접 덮어씀)',
        insert: '하단 추가(테이블 하단에 새 데이터 추가)',
        insertTop: '상단 추가(테이블 상단에 새 데이터 추가)',
        insertBottom: '하단 추가(테이블 하단에 새 데이터 추가)'
      },
      impTitle: '데이터 가져오기',
      impFile: '파일 이름',
      impSelect: '파일 선택',
      impType: '파일 유형',
      impOpts: '매개변수 설정',
      impMode: '가져오기 모드',
      impConfirm: '가져오기',
      impCancel: '취소'
    },
    export: {
      types: {
        csv: 'CSV (쉼표 구분)(*.csv)',
        html: '웹페이지(*.html)',
        xml: 'XML 데이터(*.xml)',
        txt: '텍스트 파일(탭 구분)(*.txt)',
        xls: '엑셀 97-2003 워크북(*.xls)',
        xlsx: '엑셀 워크북(*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        current: '현재 데이터(현재 페이지의 데이터)',
        selected: '선택된 데이터(현재 페이지에서 선택된 데이터)',
        all: '전체 데이터(모든 페이지의 데이터 포함)'
      },
      printTitle: '데이터 인쇄',
      expTitle: '데이터 내보내기',
      expName: '파일 이름',
      expNamePlaceholder: '파일 이름을 입력해주세요',
      expSheetName: '제목',
      expSheetNamePlaceholder: '제목을 입력해주세요',
      expType: '저장 유형',
      expMode: '데이터 선택',
      expCurrentColumn: '모든 필드',
      expColumn: '필드 선택',
      expOpts: '매개변수 설정',
      expOptHeader: '표 헤더',
      expHeaderTitle: '표 헤더가 필요한지 여부',
      expOptFooter: '표 바닥글',
      expFooterTitle: '표 바닥글이 필요한지 여부',
      expOptColgroup: '그룹화된 표 헤더',
      expColgroupTitle: '그룹화된 구조가 있는 표 헤더 지원',
      expOptMerge: '병합',
      expMergeTitle: '병합된 셀을 지원하는 경우',
      expOptAllExpand: '전체 계층 전개',
      expAllExpandTitle: '계층 구조가 있는 데이터를 전체 전개 지원',
      expOptUseStyle: '스타일',
      expUseStyleTitle: '스타일이 있는 셀을 지원하는 경우',
      expOptOriginal: '원본 데이터',
      expOriginalTitle: '원본 데이터를 테이블로 가져올 수 있습니다.',
      expPrint: '인쇄',
      expConfirm: '내보내기',
      expCancel: '취소'
    },
    modal: {
      errTitle: '오류 알림',
      zoomMin: '최소화',
      zoomIn: '최대화',
      zoomOut: '복원',
      close: '닫기',
      miniMaxSize: '최소화된 창의 개수는 {0}을 초과할 수 없습니다.',
      footPropErr: 'show-footer는 표 바닥글을 활성화하는 데만 사용되며, show-confirm-button | show-cancel-button | 슬롯과 함께 사용해야 합니다.'
    },
    drawer: {
      close: '닫기'
    },
    form: {
      folding: '접기',
      unfolding: '펼치기'
    },
    toolbar: {
      import: '가져오기',
      export: '내보내기',
      print: '인쇄',
      refresh: '새로 고침',
      zoomIn: '전체 화면',
      zoomOut: '복원',
      custom: '열 설정',
      customAll: '전체',
      customConfirm: '확인',
      customRestore: '초기화',
      fixedLeft: '왼쪽에 고정',
      fixedRight: '오른쪽에 고정',
      cancelFixed: '고정 해제'
    },
    input: {
      date: {
        m1: '01 월',
        m2: '02 월',
        m3: '03 월',
        m4: '04 월',
        m5: '05 월',
        m6: '06 월',
        m7: '07 월',
        m8: '08 월',
        m9: '09 월',
        m10: '10 월',
        m11: '11 월',
        m12: '12 월',
        quarterLabel: '{0} 년',
        monthLabel: '{0} 년',
        dayLabel: '{0} 년 {1}',
        labelFormat: {
          date: 'yyyy-MM-dd',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: 'yyyy 년 제 WW 주',
          month: 'yyyy-MM',
          quarter: 'yyyy 년 제 q 분기',
          year: 'yyyy'
        },
        weeks: {
          w: '주',
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
          q1: '1분기',
          q2: '2분기',
          q3: '3분기',
          q4: '4분기'
        }
      }
    },
    numberInput: {
      currencySymbol: '$'
    },
    imagePreview: {
      popupTitle: '미리 보기',
      operBtn: {
        zoomOut: '축소',
        zoomIn: '확대',
        pctFull: '비율 맞추기',
        pct11: '원본 크기 표시',
        rotateLeft: '왼쪽 회전',
        rotateRight: '오른쪽 회전',
        print: '이미지 인쇄',
        download: '이미지 다운로드'
      }
    },
    upload: {
      fileBtnText: '클릭하거나 드래그하여 업로드',
      imgBtnText: '클릭하거나 드래그하여 업로드',
      dragPlaceholder: '파일을 이 영역으로 드래그하여 업로드하세요',
      imgSizeHint: '단일 {0}',
      imgCountHint: '최대 {0} 장',
      fileTypeHint: '지원되는 {0} 파일 형식',
      fileSizeHint: '단일 파일 크기는 {0}를 초과할 수 없습니다',
      fileCountHint: '최대 {0} 개의 파일을 업로드할 수 있습니다',
      uploadTypeErr: '파일 형식이 일치하지 않습니다!',
      overCountErr: '최대 {0} 개의 파일만 선택할 수 있습니다!',
      overCountExtraErr: '최대 {0} 개를 초과했습니다. 초과된 {1} 개의 파일은 무시됩니다!',
      overSizeErr: '파일 크기는 {0}를 초과할 수 없습니다!',
      reUpload: '다시 업로드',
      uploadProgress: '업로드 중 {0}%',
      uploadErr: '업로드 실패',
      uploadSuccess: '업로드 성공',
      moreBtnText: '더보기 ({0})',
      viewItemTitle: '클릭하여 보기',
      morePopup: {
        readTitle: '목록 보기',
        imageTitle: '이미지 업로드',
        fileTitle: '파일 업로드'
      }
    },
    empty: {
      defText: '데이터가 없습니다'
    },
    colorPicker: {
      clear: '지우기',
      confirm: '확인',
      copySuccess: '클립보드에 복사되었습니다: {0}'
    },
    formDesign: {
      formName: '폼 이름',
      defFormTitle: '이름 없는 폼',
      widgetPropTab: '위젯 속성',
      widgetFormTab: '폼 속성',
      error: {
        wdFormUni: '이 유형의 위젯은 폼에 하나만 추가할 수 있습니다',
        wdSubUni: '이 유형의 위젯은 서브테이블에 하나만 추가할 수 있습니다'
      },
      styleSetting: {
        btn: '스타일 설정',
        title: '폼 스타일 설정',
        layoutTitle: '위젯 레이아웃',
        verticalLayout: '세로 레이아웃',
        horizontalLayout: '가로 레이아웃',
        styleTitle: '제목 스타일',
        boldTitle: '제목 굵게',
        fontBold: '굵게',
        fontNormal: '일반',
        colonTitle: '콜론 표시',
        colonVisible: '표시',
        colonHidden: '숨기기',
        alignTitle: '정렬 방식',
        widthTitle: '제목 너비',
        alignLeft: '왼쪽 정렬',
        alignRight: '오른쪽 정렬',
        unitPx: '픽셀',
        unitPct: '백분율'
      },
      widget: {
        group: {
          base: '기본 위젯',
          layout: '레이아웃 위젯',
          system: '시스템 위젯',
          module: '모듈 위젯',
          chart: '차트 위젯',
          advanced: '고급 위젯'
        },
        copyTitle: '복사_{0}',
        component: {
          input: '입력창',
          textarea: '텍스트 영역',
          select: '드롭다운 선택',
          row: '한 줄 여러 열',
          title: '제목',
          text: '텍스트',
          subtable: '서브테이블',
          VxeSwitch: '예/아니오',
          VxeInput: '입력창',
          VxeNumberInput: '숫자',
          VxeDatePicker: '날짜',
          VxeTextarea: '텍스트 영역',
          VxeSelect: '드롭다운 선택',
          VxeTreeSelect: '트리 선택',
          VxeRadioGroup: '라디오 버튼 그룹',
          VxeCheckboxGroup: '체크박스 그룹',
          VxeUploadFile: '파일',
          VxeUploadImage: '이미지',
          VxeRate: '평가',
          VxeSlider: '슬라이더'
        }
      },
      widgetProp: {
        name: '위젯 이름',
        placeholder: '프롬프트',
        required: '필수 입력 검사',
        multiple: '다중 선택 허용',
        displaySetting: {
          name: '표시 설정',
          pc: '컴퓨터',
          mobile: '모바일',
          visible: '표시',
          hidden: '숨기기'
        },
        dataSource: {
          name: '데이터 소스',
          defValue: '옵션 {0}',
          addOption: '옵션 추가',
          batchEditOption: '배치 편집',
          batchEditTip: '각 행은 하나의 옵션에 해당하며, 테이블, Excel, WPS에서 복사하여 붙여넣을 수 있습니다.',
          batchEditSubTip: '각 행은 하나의 옵션에 해당하며, 그룹이 있는 경우 하위 항목은 공백 또는 탭으로 시작할 수 있으며, 테이블, Excel, WPS에서 복사하여 붙여넣을 수 있습니다.',
          buildOption: '옵션 생성'
        },
        rowProp: {
          colSize: '열 수',
          col2: '두 열',
          col3: '세 열',
          col4: '네 열',
          col6: '여섯 열',
          layout: '레이아웃'
        },
        textProp: {
          name: '내용',
          alignTitle: '정렬 방식',
          alignLeft: '왼쪽 정렬',
          alignCenter: '가운데 정렬',
          alignRight: '오른쪽 정렬',
          colorTitle: '글꼴 색상',
          sizeTitle: '글꼴 크기',
          boldTitle: '글꼴 굵게',
          fontNormal: '일반',
          fontBold: '굵게'
        },
        subtableProp: {
          seqTitle: '순서',
          showSeq: '순서 표시',
          showCheckbox: '다중 선택 허용',
          errSubDrag: '서브테이블은 해당 위젯을 지원하지 않으며, 다른 위젯을 사용해야 합니다',
          colPlace: '위젯을 드래그하여 여기에 놓으세요'
        },
        uploadProp: {
          limitFileCount: '파일 수 제한',
          limitFileSize: '파일 크기 제한',
          multiFile: '여러 파일 업로드 허용',
          limitImgCount: '이미지 수 제한',
          limitImgSize: '이미지 크기 제한',
          multiImg: '여러 이미지 업로드 허용'
        }
      }
    },
    listDesign: {
      fieldSettingTab: '필드 설정',
      listSettingTab: '파라미터 설정',
      searchTitle: '검색 조건',
      listTitle: '목록 필드',
      searchField: '검색 필드',
      listField: '목록 필드',
      activeBtn: {
        ActionButtonUpdate: '편집',
        ActionButtonDelete: '삭제'
      },
      search: {
        addBtn: '편집',
        emptyText: '검색 조건이 설정되지 않았습니다',
        editPopupTitle: '검색 필드 편집'
      },
      searchPopup: {
        colTitle: '제목',
        saveBtn: '저장'
      }
    },
    text: {
      copySuccess: '클립보드에 복사되었습니다',
      copyError: '현재 환경에서는 이 작업을 지원하지 않습니다'
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
          mergeErr: '병합된 셀에서는 이 작업을 수행할 수 없습니다',
          multiErr: '다중 선택된 영역에서는 이 작업을 수행할 수 없습니다',
          selectErr: '지정된 영역의 셀을 조작할 수 없습니다',
          extendErr: '확장된 영역에 병합된 셀이 포함되어 있으면 모든 병합된 셀이 동일한 크기여야 합니다',
          pasteMultiErr: '붙여넣기를 할 수 없습니다. 복사된 영역과 붙여넣을 영역의 크기가 같아야 이 작업을 수행할 수 있습니다',
          cpInvalidErr: '이 작업을 수행할 수 없습니다. 선택한 영역에 금지된 열({0})이 포함되어 있습니다'
        },
        fnr: {
          title: '찾기 및 바꾸기',
          findLabel: '찾기',
          replaceLabel: '바꾸기',
          findTitle: '찾을 내용:',
          replaceTitle: '바꿀 내용:',
          tabs: {
            find: '찾기',
            replace: '바꾸기'
          },
          filter: {
            re: '정규 표현식',
            whole: '전체 단어 일치',
            sensitive: '대소문자 구분'
          },
          btns: {
            findNext: '다음 찾기',
            findAll: '모두 찾기',
            replace: '바꾸기',
            replaceAll: '모두 바꾸기',
            cancel: '취소'
          },
          header: {
            seq: '#',
            cell: '셀',
            value: '값'
          },
          body: {
            row: '행: {0}',
            col: '열: {0}'
          },
          empty: '(빈 값)',
          reError: '잘못된 정규 표현식',
          recordCount: '{0}개의 셀을 찾았습니다',
          notCell: '일치하는 셀을 찾을 수 없습니다',
          replaceSuccess: '{0}개의 셀을 성공적으로 바꾸었습니다'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: '열 고정',
          fixedGroup: '그룹 고정',
          cancelFixed: '고정 취소',
          fixedLeft: '왼쪽 고정',
          fixedRight: '오른쪽 고정'
        },
        cases: {
          equal: '같음',
          gt: '보다 큼',
          lt: '보다 작음',
          begin: '시작은',
          endin: '끝은',
          include: '포함',
          isSensitive: '대소문자 구분'
        }
      },
      filterCombination: {
        menus: {
          clearSort: '정렬 지우기',
          sortAsc: '오름차순',
          sortDesc: '내림차순',
          fixedColumn: '열 고정',
          fixedGroup: '그룹 고정',
          cancelFixed: '고정 취소',
          fixedLeft: '왼쪽 고정',
          fixedRight: '오른쪽 고정',
          clearFilter: '필터 지우기',
          textOption: '텍스트 필터',
          numberOption: '수치 필터'
        },
        popup: {
          title: '사용자 정의 필터 방식',
          currColumnTitle: '현재 열:',
          and: '그리고',
          or: '또는',
          describeHtml: '?는 한 문자로, <br/>*은 임의의 여러 문자로 표현할 수 있습니다'
        },
        cases: {
          equal: '같음',
          unequal: '같지 않음',
          gt: '보다 큼',
          ge: '보다 크거나 같음',
          lt: '보다 작음',
          le: '보다 작거나 같음',
          begin: '시작은',
          notbegin: '시작이 아님',
          endin: '끝은',
          notendin: '끝이 아님',
          include: '포함',
          exclude: '포함하지 않음',
          between: '사이',
          custom: '사용자 정의 필터',
          insensitive: '대소문자 구분 안 함',
          isSensitive: '대소문자 구분'
        },
        empty: '(빈 값)',
        notData: '일치하는 항목이 없습니다'
      }
    },
    pro: {
      area: {
        mergeErr: '병합된 셀에서는 이 작업을 수행할 수 없습니다',
        multiErr: '다중 선택된 영역에서는 이 작업을 수행할 수 없습니다',
        extendErr: '확장된 영역에 병합된 셀이 포함되어 있으면 모든 병합된 셀이 동일한 크기여야 합니다',
        pasteMultiErr: '붙여넣기를 할 수 없습니다. 복사된 영역과 붙여넣을 영역의 크기가 같아야 이 작업을 수행할 수 있습니다'
      },
      fnr: {
        title: '찾기 및 바꾸기',
        findLabel: '찾기',
        replaceLabel: '바꾸기',
        findTitle: '찾을 내용:',
        replaceTitle: '바꿀 내용:',
        tabs: {
          find: '찾기',
          replace: '바꾸기'
        },
        filter: {
          re: '정규 표현식',
          whole: '전체 단어 일치',
          sensitive: '대소문자 구분'
        },
        btns: {
          findNext: '다음 찾기',
          findAll: '모두 찾기',
          replace: '바꾸기',
          replaceAll: '모두 바꾸기',
          cancel: '취소'
        },
        header: {
          seq: '#',
          cell: '셀',
          value: '값'
        },
        empty: '(빈 값)',
        reError: '잘못된 정규 표현식',
        recordCount: '{0}개의 셀을 찾았습니다',
        notCell: '일치하는 셀을 찾을 수 없습니다',
        replaceSuccess: '{0}개의 셀을 성공적으로 바꾸었습니다'
      }
    },
    renderer: {
      search: '검색',
      cases: {
        equal: '같음',
        unequal: '같지 않음',
        gt: '보다 큼',
        ge: '보다 크거나 같음',
        lt: '보다 작음',
        le: '보다 작거나 같음',
        begin: '시작은',
        notbegin: '시작이 아님',
        endin: '끝은',
        notendin: '끝이 아님',
        include: '포함',
        exclude: '포함하지 않음',
        between: '사이',
        custom: '사용자 정의 필터',
        insensitive: '대소문자 구분 안 함',
        isSensitive: '대소문자 구분'
      },
      combination: {
        menus: {
          clearSort: '정렬 지우기',
          sortAsc: '오름차순',
          sortDesc: '내림차순',
          fixedColumn: '열 고정',
          fixedGroup: '그룹 고정',
          cancelFixed: '고정 취소',
          fixedLeft: '왼쪽 고정',
          fixedRight: '오른쪽 고정',
          clearFilter: '필터 지우기',
          textOption: '텍스트 필터',
          numberOption: '수치 필터'
        },
        popup: {
          title: '사용자 정의 필터 방식',
          currColumnTitle: '현재 열:',
          and: '그리고',
          or: '또는',
          describeHtml: '?는 한 문자로, <br/>*은 임의의 여러 문자로 표현할 수 있습니다'
        },
        empty: '(빈 값)',
        notData: '일치하는 항목이 없습니다'
      }
    }
  }
}
