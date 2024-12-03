        // 홈 버튼 클릭 이벤트 핸들러
        document.getElementById('homeBtn').addEventListener('click', function() {
            window.location.href = '../main/main.html'; // main 페이지로 이동
        });

        // API 키와 WMS 레이어 설정
        var apiKey = '5RYIZ5O3-5RYI-5RYI-5RYI-5RYIZ5O33E';
        var param = {
            name: '범죄주의구간(전체)',
            serverUrl: 'https://www.safemap.go.kr/openApiService/wms/getLayerData.do?apikey=' + apiKey,
            layername: 'A2SM_CRMNLHSPOT_TOT',
            styles: 'A2SM_CrmnlHspot_Tot_Tot'
        };

        // WMS 레이어 생성
        var wmsLayer = new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: param.serverUrl,
                params: {
                    'LAYERS': param.layername,
                    'STYLES': param.styles,
                    'FORMAT': 'image/png',
                    'EXCEPTIONS': 'text/xml',
                    'TRANSPARENT': true
                },
                serverType: 'mapserver'
            }),
            visible: true
        });

        // 지도 객체 생성
        var map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                }),
                wmsLayer
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([126.9784, 37.5665]), // 서울시청 좌표
                zoom: 10
            })
        });

        // 범죄 발생 구역 마커 데이터
        var crimeData = [

        [37.38504940000001, 127.1233468, '<div style="padding:5px;">서현역 칼부림 사건</div>'],
        [37.4683318, 126.9137816, '<div style="padding:5px;">신림동 공원 강간살인 사건</div>'],
        [37.5658178, 127.0196271, '<div style="padding:5px;">신당역 살인 사건</div>'],
        [37.2130853, 126.9740742, '<div style="padding:5px;">화성 오피스텔 여자친구 살인사건</div>'],
        [37.6802517, 126.727862, '<div style="padding:5px;">고양·양주 다방 연쇄살인 사건</div>'],
        [37.8300554, 126.952966, '<div style="padding:5px;">고양·양주 다방 연쇄살인 사건</div>'],
        [37.4834127, 126.9284429, '<div style="padding:5px;">신림역 칼부림 사건</div>'],
        [35.2588922, 129.0915364, '<div style="padding:5px;">시신유기 살인 사건</div>'],
        [37.5000776, 127.0385419, '<div style="padding:5px;">강남 납치 살해 사건</div>'],
        [36.4621196, 127.4737748, '<div style="padding:5px;">강남 납치 살해 사건</div>'],
        [36.351614, 127.3792423, '<div style="padding:5px;">대전 국민은행 강도살인 사건</div>'],
        [36.8927021, 127.1618233, '<div style="padding:5px;">천안 원룸 살인사건</div>'],
        [37.5067945, 127.0830482, '<div style="padding:5px;">송파 전 여자친구 가족 살인사건</div>'],
        [37.5019016, 127.0918885, '<div style="padding:5px;">송파 전자발찌 훼손 연속살인 사건</div>'],
        [33.4721666, 126.6674663, '<div style="padding:5px;">제주 중학생 살인사건</div>'],
        [37.47107889999999, 126.6266826, '<div style="padding:5px;">인천 노래방 손님 살해사건</div>'],
        [37.6510125, 127.0799977, '<div style="padding:5px;">노원 세 모녀 살인사건</div>'],
        [37.161811, 126.9861336, '<div style="padding:5px;">화성 연쇄살인 사건</div>'],
        [37.1536821, 126.8820747, '<div style="padding:5px;">화성 연쇄살인 사건</div>'],
        [37.2242452, 126.9859273, '<div style="padding:5px;">화성 연쇄살인 사건</div>'],
        [37.2153132, 127.0338029, '<div style="padding:5px;">화성 연쇄살인 사건</div>'],
        [37.2035633, 127.0360007, '<div style="padding:5px;">화성 연쇄살인 사건</div>'],
        [37.2113269, 127.0460882, '<div style="padding:5px;">화성 연쇄살인 사건</div>'],
        [37.2080896, 127.0566905, '<div style="padding:5px;">화성 연쇄살인 사건</div>'],
        [37.1918484, 127.0742567, '<div style="padding:5px;">화성 연쇄살인 사건</div>'],
        [36.7534962, 126.3125943, '<div style="padding:5px;">화성 연쇄살인 사건</div>'],
        [37.5808407, 126.8396624, '<div style="padding:5px;">한강 몸통시신 사건</div>'],
        [33.4721666, 126.6674663, '<div style="padding:5px;">전 남편 살해 사건</div>'],
        [35.1568923, 128.1097297, '<div style="padding:5px;">진주 아파트 방화·흉기난동 살인 사건</div>'],
        [37.4077718, 126.9580438, '<div style="padding:5px;">부모 살해 사건</div>'],
        [37.5524944, 126.8333061, '<div style="padding:5px;">서울 강서구 PC방 살인사건</div>'],
        [37.4354166, 127.0093857, '<div style="padding:5px;">과천 살인 및 사체유기 사건</div>'],
        [37.59958719999999, 127.106326, '<div style="padding:5px;">어금니 아빠 살인사건</div>'],
        [37.6315, 127.0287127, '<div style="padding:5px;">오패산터널 총격 사건</div>'],
        [33.4926562, 126.4925375, '<div style="padding:5px;">제주 성당 묻지마 살인 사건</div>'],
        [37.3258772, 126.6547685, '<div style="padding:5px;">시화호 토막 살인 사건</div>'],
        [37.6682743, 127.0636307, '<div style="padding:5px;">수락산 묻지마 살인사건</div>'],
        [37.2807648, 127.0100164, '<div style="padding:5px;">수원 토막 시체 유기 사건</div>'],
        [37.2769671, 127.0253478, '<div style="padding:5px;">수원 토막 살인 사건</div>'],
        [35.8176047, 127.1415488, '<div style="padding:5px;">아내 친구 살인사건</div>'],
        [35.1746452, 128.9884548, '<div style="padding:5px;">부산 여중생 납치 성폭행 살해사건</div>'],
        [37.85442440000001, 126.8115232, '<div style="padding:5px;">음주운전 및 살인 사건</div>'],
        [37.4522576, 126.6675965, '<div style="padding:5px;">인천 미추홀구 강도 연쇄살인 사건</div>'],
        [37.5601443, 126.9959649, '<div style="padding:5px;">서울 중구 오피스텔 살인사건</div>'],
        [37.2033411, 127.2529419, '<div style="padding:5px;">용인 옛 애인 살해사건</div>'],
        [37.2033411, 127.2529419, '<div style="padding:5px;">용인 일가족 살인사건</div>'],
        [37.3968576, 126.648872, '<div style="padding:5px;">안산 불도 토막 살인사건</div>'],
        [37.2247149864654, 126.635548281041, '<div style="padding:5px;">안산 불도 토막 살인사건</div>'],
        [37.287601, 126.8635848, '<div style="padding:5px;">안산 인질극 사건</div>'],
        [37.5223245, 126.9101692, '<div style="padding:5px;">영등포 초등학생 납치 성폭행</div>']

        ];

        // 범죄 발생 구역 마커 생성
        var crimeFeatures = crimeData.map(function(item) {
            var feature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([item[1], item[0]])),
                name: item[2]
            });

            feature.setStyle(new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // 평범한 마커 아이콘 URL
                    scale: 0.1 // 마커 크기 조절
                })
            }));

            return feature;
        });

        // 클러스터 소스 생성
        var clusterSource = new ol.source.Cluster({
            distance: 40,
            source: new ol.source.Vector({
                features: crimeFeatures
            })
        });

        // 클러스터 레이어 생성
        var styleCache = {};
        var clusters = new ol.layer.Vector({
            source: clusterSource,
            style: function(feature) {
                var size = feature.get('features').length;
                var style = styleCache[size];
                if (!style) {
                    if (size > 1) {
                        style = new ol.style.Style({
                            image: new ol.style.Circle({
                                radius: 15,
                                stroke: new ol.style.Stroke({
                                    color: '#fff'
                                }),
                                fill: new ol.style.Fill({
                                    color: '#3399CC'
                                })
                            }),
                            text: new ol.style.Text({
                                text: size.toString(),
                                fill: new ol.style.Fill({
                                    color: '#fff'
                                })
                            })
                        });
                    } else {
                        style = feature.get('features')[0].getStyle();
                    }
                    styleCache[size] = style;
                }
                return style;
            }
        });

        map.addLayer(clusters);
        

        // 검색 결과 마커 소스 생성
        var searchSource = new ol.source.Vector();

        // 검색 결과 레이어 생성
        var searchLayer = new ol.layer.Vector({
            source: searchSource,
            style: new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // 평범한 마커 아이콘 URL
                    color: '#0000FF', // 파란색으로 설정
                    scale: 0.1 // 마커 크기 조절
                })
            })
        });

        map.addLayer(searchLayer);

        // 인포윈도우 오버레이 생성
        var container = document.createElement('div');
        container.className = 'ol-popup';
        var content = document.createElement('div');
        container.appendChild(content);
        var overlay = new ol.Overlay({
            element: container,
            positioning: 'bottom-center',
            stopEvent: false,
            offset: [0, -50]
        });
        map.addOverlay(overlay);

        // 마우스 오버 및 아웃 이벤트 처리
        map.on('pointermove', function(event) {
            var feature = map.forEachFeatureAtPixel(event.pixel, function(feature) {
                return feature;
            });
            if (feature && feature.get('features')) {
                var clusterFeatures = feature.get('features');
                if (clusterFeatures.length === 1) {
                    var coordinates = clusterFeatures[0].getGeometry().getCoordinates();
                    content.innerHTML = clusterFeatures[0].get('name');
                    overlay.setPosition(coordinates);
                } else {
                    overlay.setPosition(undefined);
                }
            } else {
                overlay.setPosition(undefined);
            }
        });

        // 검색창 토글 버튼 클릭 이벤트 핸들러
        var toggleSearchBtn = document.getElementById('toggleSearchBtn');
        var searchContainer = document.getElementById('search-container');
        toggleSearchBtn.addEventListener('click', function() {
            if (searchContainer.classList.contains('collapsed')) {
                searchContainer.classList.remove('collapsed');
                toggleSearchBtn.classList.remove('collapsed');
                toggleSearchBtn.innerHTML = '<i class="fas fa-angle-double-left"></i>';
            } else {
                searchContainer.classList.add('collapsed');
                toggleSearchBtn.classList.add('collapsed');
                toggleSearchBtn.innerHTML = '<i class="fas fa-angle-double-right"></i>';
            }
        });

        // 검색 실행 함수
        function performSearch() {
            var query = document.getElementById('query').value;
            var searchType = document.getElementById('searchType').value;
            // 검색 버튼을 클릭할 때 검색 결과 마커와 리스트 초기화
            searchSource.clear();
            var listEl = document.getElementById('placesList');
            listEl.innerHTML = '';
            if (searchType === 'address') {
                searchAddress(query);
            } else {
                searchKeyword(query);
            }
        }

        // 검색 버튼과 엔터 키 입력 시 검색 수행
        document.getElementById('searchBtn').addEventListener('click', performSearch);
        document.getElementById('query').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // 주소 검색 함수
        function searchAddress(address) {
            var geocoder = new kakao.maps.services.Geocoder();
            geocoder.addressSearch(address, function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    var lonLat = [result[0].x, result[0].y];

                    var view = map.getView();
                    view.setCenter(ol.proj.fromLonLat(lonLat));
                    view.setZoom(15);

                    addSearchMarker(lonLat, "검색된 주소");
                } else {
                    alert('주소를 찾을 수 없습니다.');
                }
            });
        }

        // 키워드 검색 함수
        function searchKeyword(keyword) {
            var ps = new kakao.maps.services.Places();
            ps.keywordSearch(keyword, function(data, status) {
                if (status === kakao.maps.services.Status.OK) {
                    displayPlaces(data);
                } else {
                    alert('검색 결과가 존재하지 않습니다.');
                }
            });
        }

        // 검색 결과를 표시하는 함수
        function displayPlaces(places) {
            var listEl = document.getElementById('placesList');
            listEl.innerHTML = '';

            var bounds = new kakao.maps.LatLngBounds();

            for (var i = 0; i < places.length; i++) {
                var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
                var lonLat = [places[i].x, places[i].y];
                addSearchMarker(lonLat, places[i].place_name);

                bounds.extend(placePosition);

                var itemEl = document.createElement('li');
                itemEl.className = 'item';
                itemEl.innerHTML = places[i].place_name;

                // 검색 결과 항목 클릭 시 지도 이동 및 확대
                itemEl.addEventListener('click', (function(lonLat) {
                    return function() {
                        var view = map.getView();
                        view.setCenter(ol.proj.fromLonLat(lonLat));
                        view.setZoom(17); // 클릭 시 최대 확대 수준 설정
                    };
                })(lonLat));

                itemEl.addEventListener('mouseover', (function(lonLat, title) {
                    return function() {
                        displayInfowindow(lonLat, title);
                    };
                })(lonLat, places[i].place_name));
                itemEl.addEventListener('mouseout', function() {
                    overlay.setPosition(undefined);
                });
                listEl.appendChild(itemEl);
            }

            var view = map.getView();
            var extent = [
                ol.proj.fromLonLat([bounds.getSouthWest().getLng(), bounds.getSouthWest().getLat()]),
                ol.proj.fromLonLat([bounds.getNorthEast().getLng(), bounds.getNorthEast().getLat()])
            ];
            view.fit(ol.extent.boundingExtent(extent), {
                padding: [50, 50, 50, 50]
            });
        }

        // 마커 추가 함수 (범죄 발생 구역)
        function addMarker(lonLat, title) {
            var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat(lonLat)),
                name: title
            });

            iconFeature.setStyle(new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // 평범한 마커 아이콘 URL
                    color: '#FF0000', // 빨간색으로 설정
                    scale: 0.1 // 마커 크기 조절
                })
            }));

            clusterSource.getSource().addFeature(iconFeature);
            return iconFeature;
        }

        // 마커 추가 함수 (검색 결과)
        function addSearchMarker(lonLat, title) {
            var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat(lonLat)),
                name: title
            });

            iconFeature.setStyle(new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // 평범한 마커 아이콘 URL
                    color: '#0000FF', // 파란색으로 설정
                    scale: 0.1 // 마커 크기 조절
                })
            }));

            searchSource.addFeature(iconFeature);
            return iconFeature;
        }

        // 인포윈도우 표시 함수
        function displayInfowindow(lonLat, title) {
            var coordinates = ol.proj.fromLonLat(lonLat);
            content.innerHTML = title;
            overlay.setPosition(coordinates);
        }

        // 팝업 닫기 버튼 이벤트 핸들러
            document.getElementById('closePopupBtn').addEventListener('click', function() {
            document.getElementById('infoPopup').style.display = 'none';
        });
