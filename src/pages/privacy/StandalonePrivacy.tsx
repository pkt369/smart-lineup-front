"use client"

import type React from "react"
import { useState } from "react"
import { useDarkMode } from "../../components/DarkModeContext"
import { Shield, FileText, ArrowLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

const StandalonePrivacy: React.FC = () => {
    const { darkMode } = useDarkMode()
    const [activeTab, setActiveTab] = useState<"privacy" | "terms">("privacy")
    const navigate = useNavigate()
    const [agreed, setAgreed] = useState(false)

    const handleAgree = () => {
        // 동의 처리 로직
        setAgreed(true)
        // 동의 후 홈페이지로 리다이렉트
        navigate("/")
    }

    return (
        <div className={darkMode ? "dark" : ""}>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
                <div className="container mx-auto px-4 py-12">
                    <Link to="/" className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-8">
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        홈으로 돌아가기
                    </Link>

                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-8 border border-gray-200 dark:border-gray-700">
                            {/* 탭 네비게이션 */}
                            <div className="flex mb-8 border-b border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => setActiveTab("privacy")}
                                    className={`flex items-center pb-4 px-4 -mb-px ${activeTab === "privacy"
                                            ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium"
                                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                        }`}
                                >
                                    <Shield className="h-5 w-5 mr-2" />
                                    개인정보처리방침
                                </button>
                                <button
                                    onClick={() => setActiveTab("terms")}
                                    className={`flex items-center pb-4 px-4 -mb-px ${activeTab === "terms"
                                            ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium"
                                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                        }`}
                                >
                                    <FileText className="h-5 w-5 mr-2" />
                                    이용약관
                                </button>
                            </div>

                            {/* 개인정보처리방침 내용 */}
                            {activeTab === "privacy" && (
                                <div className="prose prose-blue max-w-none dark:prose-invert">
                                    <h1 className="text-2xl font-bold mb-6">개인정보처리방침</h1>

                                    <p className="mb-6">
                                        Smart Lineup (이하 "서비스")는 Flow Surfing(이하 "운영자")가 운영하며, 이용자의 개인정보를
                                        중요시하며, "개인정보 보호법" 등 관련 법령을 준수하고 있습니다. 본 개인정보처리방침은 이용자가
                                        제공한 개인정보가 어떻게 수집, 이용, 보관, 삭제되는지를 설명합니다.
                                    </p>

                                    <h2 className="text-xl font-semibold mt-8 mb-4">1. 수집하는 개인정보 항목 및 수집 방법</h2>
                                    <ul className="list-disc pl-6 mb-6 space-y-2">
                                        <li>회원가입 시 수집 항목: 이름, 이메일</li>
                                        <li>
                                            상점 참여 시 수집 항목: 방문자 이름, 전화번호, 대기 시간, 대기 순서, 운영자 메모(선택적 수집)
                                        </li>
                                        <li>수집 방법: 웹 애플리케이션을 통한 직접 입력</li>
                                    </ul>

                                    <h2 className="text-xl font-semibold mt-8 mb-4">2. 개인정보의 수집 및 이용 목적</h2>
                                    <ul className="list-disc pl-6 mb-6 space-y-2">
                                        <li>서비스 제공 및 운영</li>
                                        <li>사용자 인증 및 식별</li>
                                        <li>대기 순번 관리 및 상점 운영 지원</li>
                                    </ul>

                                    <h2 className="text-xl font-semibold mt-8 mb-4">3. 개인정보의 보유 및 이용 기간</h2>
                                    <p className="mb-4">개인정보는 회원 탈퇴 시까지 보관되며, 탈퇴 시 관련 정보를 모두 삭제합니다.</p>
                                    <p className="mb-6">단, 관계 법령에 따라 보존이 필요한 경우 해당 법령에 따릅니다.</p>

                                    <h2 className="text-xl font-semibold mt-8 mb-4">4. 개인정보의 제3자 제공</h2>
                                    <p className="mb-4">이용자의 개인정보는 명시된 목적 이외에는 외부에 제공하지 않습니다.</p>
                                    <p className="mb-6">단, 법령에 의거하거나 수사기관의 요청이 있을 경우 제공할 수 있습니다.</p>

                                    <h2 className="text-xl font-semibold mt-8 mb-4">5. 개인정보의 파기 절차 및 방법</h2>
                                    <p className="mb-4">회원 탈퇴 또는 수집 목적 달성 시 지체 없이 삭제됩니다.</p>
                                    <ul className="list-disc pl-6 mb-6 space-y-2">
                                        <li>전자적 파일 형태: 복구 불가능한 방식으로 영구 삭제</li>
                                        <li>종이 문서: 분쇄 또는 소각</li>
                                    </ul>

                                    <h2 className="text-xl font-semibold mt-8 mb-4">6. 이용자의 권리 및 행사 방법</h2>
                                    <p className="mb-4">이용자는 언제든지 개인정보 열람, 수정, 삭제 요청이 가능합니다.</p>
                                    <p className="mb-6">요청은 서비스 내 고객센터 또는 이메일을 통해 가능합니다.</p>

                                    <h2 className="text-xl font-semibold mt-8 mb-4">7. 개인정보 보호 책임자</h2>
                                    <p className="mb-2">책임자: 박세준 (운영자)</p>
                                    <p className="mb-6">이메일: pkt0758@gmail.com</p>

                                    <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                                        이 문서는 2025년 4월 기준 작성되었으며, 관련 법령 개정 또는 서비스 변경 시 사전 고지 후 변경될 수
                                        있습니다.
                                    </div>
                                </div>
                            )}

                            {/* 이용약관 내용 */}
                            {activeTab === "terms" && (
                                <div className="prose prose-blue max-w-none dark:prose-invert">
                                    <h1 className="text-2xl font-bold mb-6">애플리케이션 서비스 이용약관</h1>

                                    <h2 className="text-xl font-semibold mt-8 mb-4">제1조 (목적)</h2>
                                    <p className="mb-6">
                                        이 약관은 Flow Surfing(이하 "회사")가 제공하는 "Smart Lineup" 서비스(이하 "서비스")의 이용과
                                        관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                                    </p>

                                    <h2 className="text-xl font-semibold mt-8 mb-4">제2조 (이용자의 정의)</h2>
                                    <p className="mb-6">
                                        "이용자"란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 또는 비회원을 말합니다.
                                    </p>

                                    <h2 className="text-xl font-semibold mt-8 mb-4">제3조 (약관의 효력 및 변경)</h2>
                                    <p className="mb-4">
                                        본 약관은 서비스 내에 게시하거나 기타의 방법으로 공지함으로써 효력이 발생합니다.
                                    </p>
                                    <p className="mb-6">
                                        회사는 관련 법령을 위배하지 않는 범위 내에서 약관을 개정할 수 있으며, 개정 시 사전 공지합니다.
                                    </p>

                                    <h2 className="text-xl font-semibold mt-8 mb-4">제4조 (서비스의 제공 및 변경)</h2>
                                    <p className="mb-4">회사는 서비스를 일정 범위로 나누어 각 항목별로 이용 가능하게 할 수 있습니다.</p>
                                    <p className="mb-6">
                                        회사는 서비스의 내용, 이용 방법 등을 변경할 수 있으며, 변경 시 사전 공지합니다.
                                    </p>

                                    <h2 className="text-xl font-semibold mt-8 mb-4">제5조 (이용자의 의무)</h2>
                                    <p className="mb-4">
                                        이용자는 본 약관 및 관계 법령을 준수하여야 하며, 서비스의 정상적 운영을 방해하는 행위를 해서는 안
                                        됩니다.
                                    </p>
                                    <p className="mb-6">타인의 개인정보를 도용하거나 허위 정보를 등록해서는 안 됩니다.</p>

                                    <h2 className="text-xl font-semibold mt-8 mb-4">제6조 (회원 탈퇴 및 이용 제한)</h2>
                                    <p className="mb-4">이용자는 언제든지 서비스 내 기능을 통해 탈퇴할 수 있습니다.</p>
                                    <p className="mb-6">
                                        회사는 이용자가 본 약관을 위반하거나 법령을 위반한 경우, 서비스 이용을 제한하거나 계약을 해지할 수
                                        있습니다.
                                    </p>

                                    <h2 className="text-xl font-semibold mt-8 mb-4">제7조 (책임 제한)</h2>
                                    <p className="mb-4">
                                        회사는 천재지변, 불가항력적 사유로 인해 서비스를 제공할 수 없는 경우 책임을 지지 않습니다.
                                    </p>
                                    <p className="mb-6">이용자의 귀책사유로 인한 서비스 이용 장애에 대해서는 책임을 지지 않습니다.</p>

                                    <h2 className="text-xl font-semibold mt-8 mb-4">제8조 (분쟁 해결)</h2>
                                    <p className="mb-6">
                                        본 약관에 따라 발생한 분쟁에 대해서는 대한민국 법을 준거법으로 하며, 회사의 소재지를 관할하는 법원을
                                        관할 법원으로 합니다.
                                    </p>

                                    <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                                        이 문서는 2025년 4월 기준 작성되었으며, 관련 법령 개정 또는 서비스 변경 시 사전 고지 후 변경될 수
                                        있습니다.
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StandalonePrivacy
