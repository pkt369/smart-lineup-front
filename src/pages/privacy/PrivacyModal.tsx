"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Shield, FileText, X, Check } from "lucide-react"

interface PrivacyModalProps {
    isOpen: boolean
    onClose: () => void
    initialTab?: "privacy" | "terms"
    onReadComplete?: (tab: "privacy" | "terms", isRead: boolean) => void
    privacyRead?: boolean
    termsRead?: boolean
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({
    isOpen,
    onClose,
    initialTab = "privacy",
    onReadComplete,
    privacyRead = false,
    termsRead = false,
}) => {
    // 현재 활성화된 탭 상태
    const [activeTab, setActiveTab] = useState<"privacy" | "terms">(initialTab)

    // 각 탭의 읽음 상태
    const [hasReadPrivacy, setHasReadPrivacy] = useState(privacyRead)
    const [hasReadTerms, setHasReadTerms] = useState(termsRead)

    // 컨텐츠 영역 참조
    const contentRef = useRef<HTMLDivElement>(null)

    // 초기 탭 설정
    useEffect(() => {
        setActiveTab(initialTab)
    }, [initialTab, isOpen])

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
        if (!contentRef.current) return

        const { scrollTop, scrollHeight, clientHeight } = contentRef.current
        // 스크롤이 90% 이상 내려갔을 때 읽음 처리
        const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight * 0.9

        if (isScrolledToBottom) {
            if (activeTab === "privacy" && !hasReadPrivacy) {
                setHasReadPrivacy(true)
                onReadComplete && onReadComplete("privacy", true)
            } else if (activeTab === "terms" && !hasReadTerms) {
                setHasReadTerms(true)
                onReadComplete && onReadComplete("terms", true)
            }
        }
    }

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-3xl w-full h-[80vh] flex flex-col shadow-xl animate-fadeIn">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">{activeTab === "privacy" ? "개인정보처리방침" : "이용약관"}</h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* 탭 네비게이션 */}
                <div className="flex mb-4 border-b border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => setActiveTab("privacy")}
                        className={`flex items-center pb-2 px-4 -mb-px ${activeTab === "privacy"
                                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium"
                                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            }`}
                    >
                        <Shield className="h-4 w-4 mr-2" />
                        개인정보처리방침
                        {hasReadPrivacy && <Check className="h-4 w-4 ml-2 text-green-500" />}
                    </button>
                    <button
                        onClick={() => setActiveTab("terms")}
                        className={`flex items-center pb-2 px-4 -mb-px ${activeTab === "terms"
                                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium"
                                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            }`}
                    >
                        <FileText className="h-4 w-4 mr-2" />
                        이용약관
                        {hasReadTerms && <Check className="h-4 w-4 ml-2 text-green-500" />}
                    </button>
                </div>

                {/* 내용 영역 */}
                <div ref={contentRef} className="flex-1 overflow-y-auto pr-2" onScroll={handleScroll}>
                    {activeTab === "privacy" ? (
                        <div className="prose prose-sm prose-blue max-w-none dark:prose-invert">
                            <h1 className="text-xl font-bold mb-4">개인정보처리방침</h1>

                            <p className="mb-4">
                                Smart Lineup (이하 "서비스")는 Flow Surfing(이하 "운영자")가 운영하며, 이용자의 개인정보를 중요시하며,
                                "개인정보 보호법" 등 관련 법령을 준수하고 있습니다. 본 개인정보처리방침은 이용자가 제공한 개인정보가
                                어떻게 수집, 이용, 보관, 삭제되는지를 설명합니다.
                            </p>

                            <h2 className="text-lg font-semibold mt-6 mb-2">1. 수집하는 개인정보 항목 및 수집 방법</h2>
                            <ul className="list-disc pl-5 mb-4 space-y-1">
                                <li>회원가입 시 수집 항목: 이름, 이메일</li>
                                <li>상점 참여 시 수집 항목: 방문자 이름, 전화번호, 대기 시간, 대기 순서, 운영자 메모(선택적 수집)</li>
                                <li>수집 방법: 웹 애플리케이션을 통한 직접 입력</li>
                                <li>결제 시 수집 항목: 결제 수단, 카드 뒷자리 4자리 (식별 목적)</li>
                            </ul>

                            <h2 className="text-lg font-semibold mt-6 mb-2">2. 개인정보의 수집 및 이용 목적</h2>
                            <ul className="list-disc pl-5 mb-4 space-y-1">
                                <li>서비스 제공 및 운영</li>
                                <li>사용자 인증 및 식별</li>
                                <li>대기 순번 관리 및 상점 운영 지원</li>
                            </ul>

                            <h2 className="text-lg font-semibold mt-6 mb-2">3. 개인정보의 보유 및 이용 기간</h2>
                            <p className="mb-2">개인정보는 회원 탈퇴 시까지 보관되며, 탈퇴 시 관련 정보를 모두 삭제합니다.</p>
                            <p className="mb-4">단, 관계 법령에 따라 보존이 필요한 경우 해당 법령에 따릅니다.</p>

                            <h2 className="text-lg font-semibold mt-6 mb-2">4. 개인정보의 제3자 제공</h2>
                            <p className="mb-2">이용자의 개인정보는 명시된 목적 이외에는 외부에 제공하지 않습니다.</p>
                            <p className="mb-4">단, 법령에 의거하거나 수사기관의 요청이 있을 경우 제공할 수 있습니다.</p>

                            <h2 className="text-lg font-semibold mt-6 mb-2">5. 개인정보의 파기 절차 및 방법</h2>
                            <p className="mb-2">회원 탈퇴 또는 수집 목적 달성 시 지체 없이 삭제됩니다.</p>
                            <ul className="list-disc pl-5 mb-4 space-y-1">
                                <li>전자적 파일 형태: 복구 불가능한 방식으로 영구 삭제</li>
                                <li>종이 문서: 분쇄 또는 소각</li>
                            </ul>

                            <h2 className="text-lg font-semibold mt-6 mb-2">6. 이용자의 권리 및 행사 방법</h2>
                            <p className="mb-2">이용자는 언제든지 개인정보 열람, 수정, 삭제 요청이 가능합니다.</p>
                            <p className="mb-4">요청은 서비스 내 고객센터 또는 이메일을 통해 가능합니다.</p>

                            <h2 className="text-lg font-semibold mt-6 mb-2">7. 개인정보 보호 책임자</h2>
                            <p className="mb-1">책임자: 박세준 (운영자)</p>
                            <p className="mb-4">이메일: pkt0758@gmail.com</p>

                            <h2 className="text-lg font-semibold mt-6 mb-2">8. 수집한 개인정보의 위탁</h2>
                            <p className="mb-4">
                                Smart Lineup은 서비스 제공을 위해 아래와 같이 개인정보 처리 업무를 외부에 위탁하고 있으며, 관련 법령에
                                따라 개인정보가 안전하게 관리될 수 있도록 필요한 조치를 하고 있습니다.
                            </p>
                            <div className="overflow-x-auto mb-4">
                                <table className="table-auto w-full text-sm border border-gray-300 dark:border-gray-600">
                                    <thead>
                                        <tr className="bg-gray-100 dark:bg-gray-700">
                                            <th className="border px-4 py-2">수탁 업체</th>
                                            <th className="border px-4 py-2">위탁 내용</th>
                                            <th className="border px-4 py-2">보유 및 이용 기간</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border px-4 py-2">Supabase Inc.</td>
                                            <td className="border px-4 py-2">사용자 계정 정보, 방문자 정보 등 데이터베이스 관리</td>
                                            <td className="border px-4 py-2">회원 탈퇴 시까지 또는 위탁 계약 종료 시까지</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2">Toss Payments</td>
                                            <td className="border px-4 py-2">결제 처리 및 거래 내역 관리</td>
                                            <td className="border px-4 py-2">관련 법령에 따른 보관 기간 동안</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2">Render.com</td>
                                            <td className="border px-4 py-2">백엔드 서버 호스팅</td>
                                            <td className="border px-4 py-2">회원 탈퇴 시까지 또는 위탁 계약 종료 시까지</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2">Google LLC</td>
                                            <td className="border px-4 py-2">이메일 발송 서비스</td>
                                            <td className="border px-4 py-2">회원 탈퇴 시까지 또는 위탁 계약 종료 시까지</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <h2 className="text-lg font-semibold mt-6 mb-2">9. 쿠키(Cookie)의 사용</h2>
                            <p className="mb-4">
                                Smart Lineup은 서비스의 품질 향상과 사용자 편의 제공을 위해 <strong>Google Analytics</strong>를 사용하여
                                방문자의 웹사이트 이용 정보를 분석하고 있습니다. Google Analytics는 <strong>쿠키를 사용하여</strong>{" "}
                                사이트 방문자의 익명화된 정보를 수집합니다. 수집된 정보는 <strong>Google</strong>에 의해 처리되며,{" "}
                                <strong>개인 식별 정보를 포함하지 않습니다</strong>. 이 정보를 통해 서비스 개선과 최적화를 목표로
                                사용됩니다.
                            </p>
                            <ul className="list-disc pl-5 mb-4 space-y-1">
                                <li>
                                    <strong>수집 항목</strong>: 방문한 페이지, 시간, 브라우저 정보 등
                                </li>
                                <li>
                                    <strong>수집 목적</strong>: 서비스 개선, 사용자 행동 분석
                                </li>
                                <li>
                                    <strong>보유 기간</strong>: Google에서 데이터를 보유하는 기간은 Google의 개인정보처리방침에 따릅니다.
                                </li>
                                <li>
                                    <strong>쿠키 저장 거부</strong>: 사용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.
                                </li>
                            </ul>
                            <p className="mb-4">
                                Google Analytics의 개인정보처리방침은{" "}
                                <a
                                    href="https://policies.google.com/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline dark:text-blue-400"
                                >
                                    여기
                                </a>
                                에서 확인하실 수 있습니다.
                            </p>

                            <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
                                이 문서는 2025년 4월 기준 작성되었으며, 관련 법령 개정 또는 서비스 변경 시 사전 고지 후 변경될 수
                                있습니다.
                            </div>

                            {/* 추가 내용으로 스크롤 유도 */}
                            <div className="mt-10 py-10">
                                <p className="text-center text-sm text-gray-500">문서의 끝까지 스크롤하여 내용을 확인해주세요.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="prose prose-sm prose-blue max-w-none dark:prose-invert">
                            <h1 className="text-xl font-bold mb-4">애플리케이션 서비스 이용약관</h1>

                            <h2 className="text-lg font-semibold mt-6 mb-2">제1조 (목적)</h2>
                            <p className="mb-4">
                                이 약관은 Flow Surfing(이하 "회사")가 제공하는 "Smart Lineup" 서비스(이하 "서비스")의 이용과 관련하여
                                회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                            </p>

                            <h2 className="text-lg font-semibold mt-6 mb-2">제2조 (이용자의 정의)</h2>
                            <p className="mb-4">
                                "이용자"란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 또는 비회원을 말합니다.
                            </p>

                            <h2 className="text-lg font-semibold mt-6 mb-2">제3조 (약관의 효력 및 변경)</h2>
                            <p className="mb-2">본 약관은 서비스 내에 게시하거나 기타의 방법으로 공지함으로써 효력이 발생합니다.</p>
                            <p className="mb-4">
                                회사는 관련 법령을 위배하지 않는 범위 내에서 약관을 개정할 수 있으며, 개정 시 사전 공지합니다.
                            </p>

                            <h2 className="text-lg font-semibold mt-6 mb-2">제4조 (서비스의 제공 및 변경)</h2>
                            <p className="mb-2">회사는 서비스를 일정 범위로 나누어 각 항목별로 이용 가능하게 할 수 있습니다.</p>
                            <p className="mb-4">회사는 서비스의 내용, 이용 방법 등을 변경할 수 있으며, 변경 시 사전 공지합니다.</p>

                            <h2 className="text-lg font-semibold mt-6 mb-2">제5조 (이용자의 의무)</h2>
                            <p className="mb-2">
                                이용자는 본 약관 및 관계 법령을 준수하여야 하며, 서비스의 정상적 운영을 방해하는 행위를 해서는 안
                                됩니다.
                            </p>
                            <p className="mb-4">타인의 개인정보를 도용하거나 허위 정보를 등록해서는 안 됩니다.</p>

                            <h2 className="text-lg font-semibold mt-6 mb-2">제6조 (회원 탈퇴 및 이용 제한)</h2>
                            <p className="mb-2">이용자는 언제든지 서비스 내 기능을 통해 탈퇴할 수 있습니다.</p>
                            <p className="mb-4">
                                회사는 이용자가 본 약관을 위반하거나 법령을 위반한 경우, 서비스 이용을 제한하거나 계약을 해지할 수
                                있습니다.
                            </p>

                            <h2 className="text-lg font-semibold mt-6 mb-2">제7조 (책임 제한)</h2>
                            <p className="mb-2">
                                회사는 천재지변, 불가항력적 사유로 인해 서비스를 제공할 수 없는 경우 책임을 지지 않습니다.
                            </p>
                            <p className="mb-4">이용자의 귀책사유로 인한 서비스 이용 장애에 대해서는 책임을 지지 않습니다.</p>

                            <h2 className="text-lg font-semibold mt-6 mb-2">제8조 (분쟁 해결)</h2>
                            <p className="mb-4">
                                본 약관에 따라 발생한 분쟁에 대해서는 대한민국 법을 준거법으로 하며, 회사의 소재지를 관할하는 법원을
                                관할 법원으로 합니다.
                            </p>

                            <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
                                이 문서는 2025년 4월 기준 작성되었으며, 관련 법령 개정 또는 서비스 변경 시 사전 고지 후 변경될 수
                                있습니다.
                            </div>

                            {/* 추가 내용으로 스크롤 유도 */}
                            <div className="mt-10 py-10">
                                <p className="text-center text-sm text-gray-500">문서의 끝까지 스크롤하여 내용을 확인해주세요.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* 하단 상태 표시 */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                        {activeTab === "privacy"
                            ? hasReadPrivacy
                                ? "✓ 개인정보처리방침을 확인하셨습니다."
                                : "⚠️ 개인정보처리방침을 끝까지 읽어주세요."
                            : hasReadTerms
                                ? "✓ 이용약관을 확인하셨습니다."
                                : "⚠️ 이용약관을 끝까지 읽어주세요."}
                    </div>
                    <button onClick={onClose} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
                        확인
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PrivacyModal
